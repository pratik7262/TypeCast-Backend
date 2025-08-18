import { Router } from "express";
import { getUSer, login, register } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getUser", authMiddleware, getUSer);

export default userRouter;
