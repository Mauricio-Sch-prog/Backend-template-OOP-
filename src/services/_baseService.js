
export class BaseService {
  handleError (error, context = "Service") {
    console.error(`[${context} Error]:`, error.message);
    throw new Error(error.message || "An unexpected error occurred.");
  }

  ensureExists (entity, name = "Record") {
    if (!entity) {
      throw new Error(`${name} not found.`);
    }
    return entity;
  }
}