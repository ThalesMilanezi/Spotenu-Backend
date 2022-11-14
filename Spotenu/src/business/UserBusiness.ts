import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { InvalidParameterError } from "../errors/InvalidParameters";
import { Unauthorized } from "../errors/Unauthorized";
import { User, stringToUserRole, UserRole } from "../model/User";
import { Forbidden } from "../errors/Forbidden";
import { Sucess } from "../errors/Sucess";


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
    if (!name || !email || !nickname || !password) {
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
    if (!name || !email || !nickname || !password) {
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
    description: string
  ) {
    if (name === undefined ||
      email === undefined ||
      nickname === undefined ||
      password === undefined ||
      description === undefined
    ) {
      throw new InvalidParameterError("Missing inputs, check the requireds inputs and try again!")
    }

    if (password.length < 6) {
      throw new Unauthorized("The password has to been at least 6 characters")
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Check the email format and try again.")
    }

    let role = UserRole.BAND
    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password)

    const newBand = new User(id, name, email, nickname, cryptedPassword, role, description)
    await this.userDataBase.createBand(newBand)
    
    if (newBand.getisApproved() === undefined) {
      throw new Sucess("Sua Banda foi criada com sucesso, no entanto é necessário esperar a aprovação dos administradores")
    } 
  }

  public async login(userInput: string, password: string) {
    
    if (!userInput || !password) {
      throw new InvalidParameterError("Missing inputs, check the requireds inputs and try again!")
    }
    
    let user
    
    if (userInput.indexOf("@") !== -1) {
      user = await this.userDataBase.getUserByEmail(userInput)
    } else {
      user = await this.userDataBase.getUserByNickname(userInput)
    }
    
    if (!user) {
      throw new Error("This user is not found in our site, try again")
    }

    const correctPassword = await this.hashGenerator.compareHash(password, user.getPassword())
    
    if (!correctPassword) {
      throw new Unauthorized("Some credencials are incorrect")
    }
    const acessToken = this.tokenGenerator.generate({
      id: user.getId(),
      role: user.getRole()
    })
    return { acessToken }
  }

  public async ApproveBand(id: string, token: string) {
    const verifyUser = this.tokenGenerator.verify(token)
    await this.userDataBase.getUserById(verifyUser.id)
    await this.userDataBase.getUserById(id)
    await this.userDataBase.approveBand(id as any)

  }

  public async getAllBands(token: string) {
    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDataBase.getUserById(verifyUser.id)

    if(!user){
      throw new Error('User not found in database')
    }

    if (user.getRole() !== "ADMIN") {
      throw new Unauthorized("You must be admin to see all bands")
    }

    const bands = await this.userDataBase.getAllBands()

    return bands
  }

  public async getUsers(token: string) {
    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDataBase.getUserById(verifyUser.id)

    const getUser = await this.userDataBase.getUserById(user!.getId())
    return getUser
  }
}