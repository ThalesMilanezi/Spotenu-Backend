import { Request, Response } from 'express'
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from '../data/BaseDatabase';
import { UserRole } from '../model/User';

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
        req.body.name, req.body.email, req.body.nickname, req.body.password, UserRole.FREE
      );
      res.status(200).send(result)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }
    }
    await BaseDatabase.destroyConnection()

  }

  public async signUpAdmin(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupAdmin(
        req.body.name, req.body.email, req.body.nickname, req.body.password, UserRole.ADMIN
      );
      res.status(200).send(result)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }    }
    await BaseDatabase.destroyConnection()

  }

  public async signUpBand(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupBand(
        req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.description
      );
      res.status(200).send(result)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }    
    }
    await BaseDatabase.destroyConnection()

  }

  public async login(req: Request, res: Response) {
    try {
      let result
      if (req.body.userInput.indexOf("@") !== -1) {
        result = await UserController.UserBusiness.login(req.body.userInput, req.body.password)
      } if (req.body.userInput) {
        result = await UserController.UserBusiness.login(req.body.userInput, req.body.password)
      }
      res.status(200).send(result)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }    
    }
    await BaseDatabase.destroyConnection()

  }


  public async getAllBands(req: Request, res: Response) {
    const token = req.headers.authorization || req.headers.Authorization as string
    try {
      const result = await UserController.UserBusiness.getAllBands(token)
      res.status(200).send(result)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }    
    }
    await BaseDatabase.destroyConnection()
  }

  public async ApproveBand(req: Request, res: Response) {
    const token = req.headers.authorization || req.headers.Authorization as string
    try {
      const result = await UserController.UserBusiness.ApproveBand(req.body.id, token)
      res.status(200).send({ message: "banda aprovada com sucesso" })
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }
    }
    await BaseDatabase.destroyConnection()
  }

  public async getUser(req: Request, res: Response) {
    const token = req.headers.authorization || req.headers.Authorization as string
    try {
      const result = await UserController.UserBusiness.getUsers(token)
    } catch (err) {
      if(err instanceof Error){
        res.status(400).send({ message: err.message })
      }
    }
    await BaseDatabase.destroyConnection()
  }
}
