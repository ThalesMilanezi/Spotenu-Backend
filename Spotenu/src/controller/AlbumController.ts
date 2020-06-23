import { Request, Response } from 'express'
import { AlbumBusiness } from "../business/AlbumBusiness";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class AlbumController {
  private static AlbumBusiness = new AlbumBusiness(
    new AlbumDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new TokenGenerator()
  )

  public async createAlbum(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await AlbumController.AlbumBusiness.createAlbum(req.body.name, token)
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
  }

  public async getAlbumById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await AlbumController.AlbumBusiness.getAlbumById(req.body.id, token)
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
  }
}