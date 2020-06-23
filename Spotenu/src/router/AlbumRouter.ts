import express from 'express'
import { AlbumController } from '../controller/AlbumController';

export const albumRouter = express.Router();

albumRouter.post("/create", new AlbumController().createAlbum)
albumRouter.post("/search", new AlbumController().getAlbumById)
