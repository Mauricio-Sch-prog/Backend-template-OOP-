import { DataTypes } from "sequelize";
import { BaseModel } from "./_baseModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import ApiError from "../../utils/ApiError.js";



export class User extends BaseModel {

  async comparePassword (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  generateTemporaryToken () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("SHA256")
      .update(unHashedToken)
      .digest("hex");
      
    const tokenExpiry = new Date(Date.now() + (20+60+1000));

    return{ unHashedToken, hashedToken, tokenExpiry };
  }



  static initModel (sequelize) {
    const model = this.init(
      this.getBaseSchema({
        fullname: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: true,
          },
          unique: true,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true,
            notEmpty: true,
          },
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [8, 100],
            isStrong (value) {
              if(this.changed("password")) {
                const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
                if (!strongRegex.test(value)) {
                  throw new ApiError(
                    401,
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number."
                  );
                }
              }
            }
          }
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        forgotPasswordToken: {
          type: DataTypes.STRING
        },
        forgotPasswordTokenExpiry: {
          type: DataTypes.DATE
        },
        verifyToken: {
          type: DataTypes.STRING
        },
        verifyTokenExpiry: {
          type: DataTypes.DATE
        },
      }),
      { 
        sequelize, 
        modelName: "user" 
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    });

    return model;
  }

  static associate (models) {
    // this.hasMany(models.Post);
  }

  
}

