import { Op } from "sequelize";
import UserRepository from "../database/repositories/UserRepository.js";
import EmailProvider from "../providers/EmailProvider.js";
import { BaseService } from "./_baseService.js";
import ApiError from "../utils/ApiError.js";
import crypto from "crypto";

class AuthService extends BaseService {
  async registerUser (userData) {
    try {
      const existingUser = await UserRepository.findOne({ where: { [Op.or] : [
        { username: { [Op.like] : userData.username } },
        { email: { [Op.like] : userData.email } },
      ] } });

      if(existingUser) throw new ApiError(400, "Email ou nome já está em uso");

      const user = await UserRepository.create(userData);
      const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();
      UserRepository.update(user.id, {
        verifyToken: hashedToken,
        verifyTokenExpiry: tokenExpiry
      });

      await EmailProvider.sendVerificationEmail(user, unHashedToken);

      return user;

    } catch (err) {
      this.handleError(err, "AuthService.register");
    }
    


  }
  async loginUser (userData) {
    try {
      const existingUser = await UserRepository.findOne({ where: { [Op.or] : [
        { username: { [Op.like] : userData.login } },
        { email: { [Op.like] : userData.login } },
      ] } });

      if(!existingUser) throw new ApiError(400, "User not found");

      const response = await existingUser.comparePassword(userData.password);

      return;

    } catch (err) {
      this.handleError(err, "AuthService.register");
    }
    


  }

  

  async verifyEmail (verificationToken) {
    try {
      if(!verificationToken) throw new ApiError(400, "Token is missing");
      const hashedToken = crypto
        .createHash("SHA256")
        .update(verificationToken)
        .digest("hex");

      const existingUser = await UserRepository.findOne({ where: { verifyToken: hashedToken, verifyTokenExpiry: { [Op.lt]: new Date() } } });
      if(!existingUser) throw new ApiError(400, "Token expired");

      existingUser.update({ isVerified: true, verifyToken: null, verifyTokenExpiry: null });

      return existingUser;
    } catch (err) {
      this.handleError(err, "AuthService.verifyEmail");
    }

  }

  async forgotPassword (email) {
    try {
      const existingUser = await UserRepository.findOne({ where: { email } });

      if(!existingUser) throw new ApiError(400, "User not found");

      const { unHashedToken, hashedToken, tokenExpiry } = existingUser.generateTemporaryToken();

      UserRepository.update(existingUser.id, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: tokenExpiry
      });
      
      await EmailProvider.sendForgotPasswordEmail(existingUser, unHashedToken);

      return existingUser;

    } catch (err) {
      this.handleError(err, "AuthService.forgotPassword");
    }
    


  }

  async changePassword (verificationToken, newPassword) {
    try {
      if(!verificationToken) throw new ApiError(400, "Token is missing");
      const hashedToken = crypto
        .createHash("SHA256")
        .update(verificationToken)
        .digest("hex");

      const existingUser = await UserRepository.findOne({
        where: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: { [Op.lt]: new Date() } } 
      });
      if(!existingUser) throw new ApiError(400, "Token expired");

      existingUser.update({
        password: newPassword, forgotPasswordToken: null, forgotPasswordTokenExpiry: null
      });

      return existingUser;
    } catch (err) {
      this.handleError(err, "AuthService.verifyEmail");
    }
    


  }
}

export default new AuthService();