import express from "express";

import authRouter from "./routes/auth.routes.js";
import { globalErrorMiddleware } from "./middlewares/globalErrorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);



app.use(globalErrorMiddleware);

export default app;