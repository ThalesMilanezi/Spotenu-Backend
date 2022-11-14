import { MusicDatabase } from "../data/MusicDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { Unauthorized } from "../errors/Unauthorized";
import { Music } from "../model/Music";
import { NotFoundError } from "../errors/NotFoundError";

export class MusicBusiness {
  constructor(
    private musicDatabase: MusicDatabase,
    private userDatabase: UserDatabase,
    private albumDatabase: AlbumDatabase,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator
  ) { }

  public async createMusic(name:string,albumId:string, token: string){
    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)
    
    if(!user){
      throw new Error('User not found in database')
    }

    if (user.getRole() !== "ADMIN" && user.getRole() !== "BAND") {
      throw new Unauthorized("You can't create a new music!")
    }

    const searchAlbum = await this.albumDatabase.getAlbumById(albumId)
    if(!searchAlbum){
      throw new Error("This album does not exist, try again!")
    }

    const idMusic = await this.idGenerator.generate()
    const music = new Music(idMusic,name,albumId)
    await this.musicDatabase.createMusic(music)
  }

  public async getMusicById(id: string, token:string){

    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)
    if(!user){
      throw new NotFoundError("This user does not exist")
    }

    if (user.getRole() !== "ADMIN" && user.getRole() !== "BAND") {
      throw new Unauthorized("You can't create a new music!")
    }
    await this.musicDatabase.getMusicById(id)
  }

  public async deleteMusic(id:string, token:string) {
    const verifyUser = this.tokenGenerator.verify(token)
    const user = await this.userDatabase.getUserById(verifyUser.id)

    if(!user){
      throw new NotFoundError("This user does not exist")
    }

    await this.musicDatabase.deleteMusic(id)
  }
}