import express from "express";
import { AuthController } from "../controllers/UserController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { changePasswordSchema, loginSchema, registerSchema } from "../validators/userSchema.js";


const router = express.Router();

router.post("/register",validate(registerSchema), AuthController.register);
router.post("/login",validate(loginSchema), AuthController.login);
router.get("/verify-email/:verificationToken", AuthController.verify);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/change-password/:verificationToken",validate(changePasswordSchema), AuthController.changePassword);

export default router;