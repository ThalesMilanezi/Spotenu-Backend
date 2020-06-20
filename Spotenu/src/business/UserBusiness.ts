import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { InvalidParameterError } from "../errors/InvalidParameters";
import { Unauthorized } from "../errors/Unauthorized";
import { User, stringToUserRole, UserRole } from "../model/User";
import { Forbidden } from "../errors/Forbidden";


export class UserBusiness {
  constructor(
    private userDataBase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator
  ) { }

  public async signupListener(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string
  ) {
    if (!name || !email || !nickname || !password || !role) {
      throw new InvalidParameterError("Missing inputs, check the requireds inputs and try again!")
    }

    if (password.length < 6) {
      throw new Unauthorized("The password has to been at least 6 characters")
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Check the email format and try again.")
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password)

    const user = new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role))

    await this.userDataBase.createUser(user)

    const acessToken = this.tokenGenerator.generate({
      id, role
    })
    return { acessToken }
  }

  public async signupAdmin(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string
  ) {
    if (!name || !email || !nickname || !password || !role) {
      throw new InvalidParameterError("Missing inputs, check the requireds inputs and try again!")
    }

    if (password.length < 10) {
      throw new Unauthorized("The password has to been at least 10 characters")
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Check the email format and try again.")
    }

    if (role !== UserRole.ADMIN) {
      throw new Forbidden("You must be admin to create a new admin")
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password)

    await this.userDataBase.createUser(
      new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role))
    )

    const acessToken = this.tokenGenerator.generate({
      id, role
    })
    return { acessToken }
  }

  public async signupBand(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string,
    description: string,
    isApproved: boolean
  ) {
    if (!name || !email || !nickname || !password || !role || !description) {
      throw new InvalidParameterError("Missing inputs, check the requireds inputs and try again!")
    }

    if (password.length < 6) {
      throw new Unauthorized("The password has to been at least 6 characters")
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Check the email format and try again.")
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password)

    await this.userDataBase.createUser(
      new User(id, name, email, nickname, cryptedPassword, stringToUserRole(role), description)
    )

    const acessToken = this.tokenGenerator.generate({
      id, role
    })
    if (!isApproved) {
      throw new Forbidden("Your band is not approved yet, check again later")
    } else {
      return { acessToken }
    }
  }

  public async login(emailOrNickname: string, password: string) {
    if (!emailOrNickname || !password) {
      throw new InvalidParameterError("Missing inputs, check the requireds inputs and try again!")
    }

    const userEmail = await this.userDataBase.getUserByEmail(emailOrNickname)
    const userNickname = await this.userDataBase.getUserByNickname(emailOrNickname)

    if (emailOrNickname.indexOf("@")) {
      const correctPassword = await this.hashGenerator.compareHash(password, userEmail!.getPassword())
      if (!correctPassword) {
        throw new Unauthorized("Some credencials are incorrect")
      }
      const acessToken = this.tokenGenerator.generate({
        id: userEmail!.getId(),
        role: userEmail!.getRole()
      })

      return { acessToken }

    } else {
      const correctPassword = await this.hashGenerator.compareHash(password, userNickname!.getPassword())
      if (!correctPassword) {
        throw new Unauthorized("Some credencials are incorrect")
      }
      const acessToken = this.tokenGenerator.generate({
        id: userNickname!.getId(),
        role: userNickname!.getRole()
      })

      return { acessToken }
    }

  }


}