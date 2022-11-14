import { GenderDatabase } from "../data/GenderDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Unauthorized } from "../errors/Unauthorized";
import { Gender } from "../model/Gender";

export class GenderBusiness {
  constructor(
    private genderDataBase: GenderDatabase,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokengenerator: TokenGenerator
  ) { }

  public async createGender(name: string, token: string) {
    const verifyUser = this.tokengenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)

    if(!user){
      throw new Error('User not found in database')
    }

    if (user.getRole() !== "ADMIN") {
      throw new Unauthorized("You must be a adminstrator of this page to access this create a gender")
    }
    const idGender = this.idGenerator.generate()
    const gender = new Gender(idGender, name)
    await this.genderDataBase.createGender(gender)
  }

  public async getGenderByName(name: string, token: string) {
    const verifyUser = this.tokengenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)

    if(!user){
      throw new Error('User not found in database')
    }

    if (user.getRole() !== "ADMIN") {
      throw new Unauthorized("You must be a adminstrator of this page to access this create a gender")
    }
    return await this.genderDataBase.getGenderByName(name)
  }

  public async getAllGender(token: string) {
    const verifyUser = this.tokengenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)

    if(!user){
      throw new Error('User not found in database')
    }

    if (user.getRole() !== "ADMIN") {
      throw new Unauthorized("You must be a adminstrator of this page to access this create a gender")
    }
    return await this.genderDataBase.getAllGender()
  }
}