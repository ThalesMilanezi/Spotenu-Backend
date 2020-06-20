import express from 'express'
import { UserController } from '../controller/UserController';
export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signUpListener)
userRouter.post("/signup", new UserController().signUpBand)
userRouter.post("/signup", new UserController().signUpAdmin)
userRouter.post("/login", new UserController().login)
