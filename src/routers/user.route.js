import {
    login,
    register
} from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/users/login", login);
userRouter.post("/users/register", register);


export default userRouter;