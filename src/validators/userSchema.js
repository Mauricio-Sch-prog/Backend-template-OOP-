import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

const registerSchema = Joi.object({
  fullname: Joi.string().min(3),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(passwordRegex)
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required"
    })
});

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});

const changePasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(passwordRegex)
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required"
    })
});

export { registerSchema, loginSchema, changePasswordSchema };