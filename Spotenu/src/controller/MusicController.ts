import { Request, Response } from 'express'
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { BaseDatabase } from '../data/BaseDatabase';

export class MusicController {
  private static musicBusiness = new MusicBusiness(
    new MusicDatabase(),
    new UserDatabase(),
    new AlbumDatabase(),
    new IdGenerator(),
    new TokenGenerator()
  )
  public async createMusic(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await MusicController.musicBusiness.createMusic(req.body.name, req.body.albumId, token)
      res.status(200).send({message: "Musica criada com sucesso!"})
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
    await BaseDatabase.destroyConnection()
  }

  public async getMusicById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await MusicController.musicBusiness.getMusicById(req.params.id, token)
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
    await BaseDatabase.destroyConnection()
  }
}