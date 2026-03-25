import { Op } from "sequelize";
import UserRepository from "../database/repositories/UserRepository.js";
import EmailProvider from "../providers/EmailProvider.js";
import { BaseService } from "./_baseService.js";
import ApiError from "../Utils/ApiError.js";

class AuthService extends BaseService {
  async registerUser (userData) {
    try {
      const existingUser = await UserRepository.findOne({ where: { [Op.or] : [
        { username: { [Op.like] : `%${userData.username}%` } },
        { email: { [Op.like] : `%${userData.email}%` } },
      ] } });

      if(existingUser) throw new ApiError(400, "Email ou nome já está em uso");

      const user = await UserRepository.create(userData);
      await EmailProvider.sendVerificationEmail(user);

      return user;

    } catch (err) {
      this.handleError(err, "AuthService.register");
    }
    


  }
}

export default new AuthService();