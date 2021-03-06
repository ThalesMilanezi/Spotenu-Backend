import { BaseDatabase } from './BaseDatabase'
import { User } from '../model/User'

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME: string = "UserSpotenu"

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.email,
        dbModel.nickname,
        dbModel.password,
        dbModel.role,
        dbModel.is_approved,
        dbModel.description
      )
    )
  }

  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        nickname: user.getNickname(),
        password: user.getPassword(),
        role: user.getRole()
      })
      .into(UserDatabase.TABLE_NAME)
  }

  public async createBand(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        nickname: user.getNickname(),
        password: user.getPassword(),
        role: user.getRole(),
        description: user.getDescription(),
        is_approved: user.getisApproved()
      })
      .into(UserDatabase.TABLE_NAME)
  }

  public async approveBand(id: User): Promise<void> {
    await this.getConnection().raw(`
    UPDATE UserSpotenu
    SET is_approved = 1
    WHERE id = "${id}";
  `)
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email })
    return this.toModel(result[0])
  }

  public async getUserByNickname(nickname: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ nickname })
    return this.toModel(result[0])
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id })
    return this.toModel(result[0])
  }

  public async getAllBands(): Promise<User | undefined> {
    const result = await this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE role = "BAND"
    `)
    return result[0].map((item:any )=> this.toModel(item))
  }
}