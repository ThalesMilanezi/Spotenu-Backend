import { Request, Response } from 'express'
import { AlbumBusiness } from "../business/AlbumBusiness";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { BaseDatabase } from '../data/BaseDatabase';

export class AlbumController {
  private static AlbumBusiness = new AlbumBusiness(
    new AlbumDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new TokenGenerator()
  )

  public async createAlbum(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || req.headers.Authorization as any
      const result = await AlbumController.AlbumBusiness.createAlbum(req.body.name, token)
      res.status(200).send({message: "Album criado com sucesso!"})
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }
    }
    await BaseDatabase.destroyConnection()
  }

  public async getAlbumById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || req.headers.Authorization as any
      const result = await AlbumController.AlbumBusiness.getAlbumById(req.body.id, token)
      res.status(200).send(result)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }
    }
    await BaseDatabase.destroyConnection()
  }
}