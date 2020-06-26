import { Request, Response } from 'express'
import { GenderBusiness } from "../business/GenderBusiness";
import { GenderDatabase } from "../data/GenderDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { BaseDatabase } from '../data/BaseDatabase';

export class GenderController {
  private static GenderBusiness = new GenderBusiness(
    new GenderDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new TokenGenerator()
  )

  public async createGender(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await GenderController.GenderBusiness.createGender(req.body.name, token)
      res.status(200).send({message: "Parabens, genero criado com sucesso!"})
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
    await BaseDatabase.destroyConnection()
  }

  public async getGenderByName(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await GenderController.GenderBusiness.getGenderByName(req.body.name, token)
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
    await BaseDatabase.destroyConnection()
  }

  public async getAllGenders(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as any
      const result = await GenderController.GenderBusiness.getAllGender(token)
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message
      })
    }
    await BaseDatabase.destroyConnection()
  }

}