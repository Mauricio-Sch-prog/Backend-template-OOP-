import { BaseRepository } from "./_baseRepository.js";
import models from "../../database/models/index.js";

class UserRepository extends BaseRepository {
  constructor (model) {
    super(model);
  }

  async findByUsername (username) {
    return await this.model.findOne({ where: { username, status: true } });
  }
  async findByEmail (email) {
    return await this.model.findOne({ where: { email, status: true } });
  }
}

export default new UserRepository(models.user);

