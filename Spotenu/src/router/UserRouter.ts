import express from 'express'
import { UserController } from '../controller/UserController';
export const userRouter = express.Router();

userRouter.post("/listener", new UserController().signUpListener)
userRouter.post("/band", new UserController().signUpBand)
userRouter.post("/admin", new UserController().signUpAdmin)
userRouter.post("/login", new UserController().login)
userRouter.get("/band/all", new UserController().getAllBands )
userRouter.post("/approvebands", new UserController().ApproveBand)
userRouter.get("/profile", new UserController().getUser)