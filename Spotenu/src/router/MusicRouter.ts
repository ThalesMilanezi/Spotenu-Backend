import express from 'express'
import { MusicController } from '../controller/MusicController'

export const musicRouter = express.Router()

musicRouter.post("/create", new MusicController().createMusic)
musicRouter.get("/search", new MusicController().getMusicById)