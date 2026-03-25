import express from "express";
import { AuthController } from "../controllers/UserController.js";


const router = express.Router();

router.post("/create", AuthController.register);

export default router;