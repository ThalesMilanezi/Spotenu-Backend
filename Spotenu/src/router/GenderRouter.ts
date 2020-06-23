import express from 'express'
import { GenderController } from '../controller/GenderController';

export const genderRouter = express.Router();

genderRouter.post("/create", new GenderController().createGender)
genderRouter.get("/all", new GenderController().getAllGenders)
genderRouter.get("/name", new GenderController().getGenderByName)
