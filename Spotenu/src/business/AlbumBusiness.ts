import { AlbumDatabase } from "../data/AlbumDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { Unauthorized } from "../errors/Unauthorized";
import { Album } from "../model/Album";

export class AlbumBusiness {
  constructor(
    private albumDatabase: AlbumDatabase,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator
  ) { }

  public async createAlbum(name: string, token: string) {
    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)

    if (user?.getRole() !== "ADMIN" && user?.getRole() !== "BAND") {
      throw new Unauthorized("You can't create a new album!")
    }
    const idAlbum = this.idGenerator.generate()
    const newBandId = user.getId()
    const album = new Album(idAlbum, name, newBandId)
  
  await this.albumDatabase.createAlbum(album)
  }

  public async getAlbumById(id:string, token:string) {
    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)

    if (user?.getRole() !== "ADMIN" && user?.getRole() !== "BAND") {
      throw new Unauthorized("You can't search any album!")
    }
    await this.albumDatabase.getAlbumById(id)
  }
}