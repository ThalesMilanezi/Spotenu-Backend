import { Request, Response } from 'express'
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from '../data/BaseDatabase';

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator()
  )

  public async signUpListener(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupListener(
        req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.role
      );
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({ message: err.message })
    }

  }

  public async signUpAdmin(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupListener(
        req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.role
      );
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({ message: err.message })
    }
  }

  public async signUpBand(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupBand(
        req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.role, req.body.description, req.body.isApproved
      );
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({ message: err.message })
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.login(req.body.emailOrNickname, req.body.password)
      res.status(200).send(result)
    } catch (err) {
      res.status(err.erroCode || 400).send({ message: err.message })
    }
  }


  public async getAllBands(req: Request, res: Response) {
    const token = req.headers.authorization as string
    try {
      const result = await UserController.UserBusiness.getAllBands(token)
      res.status(200).send(result)
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message })
    }
  }

  public async ApproveBand(req: Request, res: Response) {
    const token = req.headers.authorization as string
    try {
      const result = await UserController.UserBusiness.ApproveBand(req.body.id, token)
      res.status(200).send({ message: "banda aprovada com sucesso" })
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message })
    }
  }
}