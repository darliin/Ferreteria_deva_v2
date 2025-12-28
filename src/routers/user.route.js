import { login, register } from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

export default userRouter;
