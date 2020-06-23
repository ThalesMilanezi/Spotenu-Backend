import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../model/Album";

export class AlbumDatabase extends BaseDatabase {
  public static TABLE_NAME: string = "AlbumSpotenu"

  private toModel(dbModel: any): Album | undefined {
    return(
      dbModel &&
      new Album(
        dbModel.id,
        dbModel.name,
        dbModel.band
      )
    )
  }

  public async createAlbum(album: Album): Promise<void> {
    await this.getConnection()
    .insert({
      id: album.getid(),
      name: album.getName(),
      band_id: album.getBand()
    })
    .into(AlbumDatabase.TABLE_NAME)
  }

  public async getAlbumById(id: string): Promise<Album | undefined>{
    const result = await this.getConnection()
    .select("*")
    .from(AlbumDatabase.TABLE_NAME)
    .where({id})

    return this.toModel(result[0])
  }
}