import ApiError from "../utils/ApiError.js";

export class BaseService {
  handleError (error, context = "Service") {
    console.error(`[${context} Error]:`, error.message);
    throw new ApiError(error.statusCode || 500, error.message || "An unexpected error occurred.");
  }

  ensureExists (entity, name = "Record") {
    if (!entity) {
      throw new ApiError(404, `${name} not found.`);
    }
    return entity;
  }
}