import { BaseDatabase } from "./BaseDatabase";
import { Gender } from "../model/Gender";

export class GenderDatabase extends BaseDatabase {
  public static TABLE_NAME: string = "GenderSpotenu"

  private toModel(dbModel: any): Gender | undefined {
    return(
      dbModel &&
      new Gender(
        dbModel.id,
        dbModel.name
      )
    )
  }

  public async createGender(gender: Gender): Promise<void> {
    await this.getConnection()
    .insert({
      id: gender.getid(),
      name: gender.getName()
    })
    .into(GenderDatabase.TABLE_NAME)
  }

  public async getGenderById(id: string): Promise<Gender | undefined> {
    const result = await this.getConnection()
    .select('*')
    .from(GenderDatabase.TABLE_NAME)
    .where({ id })
    return this.toModel(result[0])
  }

  public async getGenderByName(name: string): Promise<Gender | undefined> {
    const result = await this.getConnection()
  .select("*")
  .from(GenderDatabase.TABLE_NAME)
  .where({name})
  return this.toModel(result[0])
  }

  public async getAllGender(): Promise<Gender | undefined> {
    const result = await this.getConnection()
    .select("*")
    .from(GenderDatabase.TABLE_NAME)
    return this.toModel(result[0])
  }

}