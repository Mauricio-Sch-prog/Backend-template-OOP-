import UserRepository from "../database/repositories/UserRepository.js";
import EmailProvider from "../providers/EmailProvider.js";

class AuthService {
  async registerUser (userData) {
    
    const user = await UserRepository.create(userData);

    await EmailProvider.sendVerificationEmail(user);

    return user;
  }
}

export default new AuthService();