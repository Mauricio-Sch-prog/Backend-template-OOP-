import env from "../../config/cleanEnv.js";
import ApiError from "../../utils/ApiError.js";

export class BaseRepository {
  constructor (model) {
    this.model = model;
  }

  async findOne (options = {}) {
    return await this.model.findOne({ ...options, where: { ...options.where , status: true } });
  }

  async findAll (options = {}) {
    return await this.model.findAll({ ...options, where: { ...options.where , status: true } });
  }

  async findById (id) {
    return await this.model.findOne({ where:{ id, status: true } });
  }

  async create (data) {
    return await this.model.create(data);
  }

  async update (id, data) {
    const record = await this.findOne({ where:{ id, status: true } });
    if (!record) throw new ApiError(404, "Record not found");
    return await record.update(data);
  }

  async delete (id) {
    const record = await this.findOne({ where:{ id, status: true } });
    if (!record) throw new ApiError(404, "Record not found");
    return await record.update({ status: false });
  }

  async restore (id) {
    if(env.IS_ADMIN) {
      const record = await this.findOne({ where:{ id } });
      if(!record) throw new ApiError(404, "Id doesn't exist in this table");
      return await record.update({ status: true });
    }else{
      throw new ApiError(401, "Development only function");
    }
  }
}