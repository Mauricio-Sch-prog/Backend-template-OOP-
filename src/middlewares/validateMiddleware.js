import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/async-handler.js";


export const validate = (schema) => asyncHandler(async (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
    
  if (error) {
    const message = error.details.map(i => i.message).join(", ");
    throw new ApiError(400, message);
  }
    
  next();
});