import { DataTypes, Model } from "sequelize";

export class BaseModel extends Model {

  static getBaseSchema (specificFields) {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      ...specificFields
    };
  }


  toJSON () {
    const values = { ...this.get() };
    const hiddenFields = ["password", "token", "secret"];
    
    hiddenFields.forEach(field => {
      if(values[field]) delete values[field];
    });
    
    return values;
  }


  isRecent () {
    const hour = 60 * 60 * 1000;
    return (new Date() - this.createdAt) < hour;
  }


  getFormattedDate (field = "createdAt") {
    return this[field].toLocaleString("en-US", { 
      dateStyle: "medium", 
      timeStyle: "short" 
    });
  }
}
