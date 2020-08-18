import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";

export class MusicDatabase extends BaseDatabase {
  public static TABLE_NAME= "MusicSpotenu"

  private toModel(dbModel: any): Music | undefined {
    return (
      dbModel &&
      new Music(
        dbModel.id,
        dbModel.name,
        dbModel.album
      )
    )
  }

  public async createMusic(music: Music): Promise<void> {
    await this.getConnection()
      .insert({
        id: music.getId(),
        name: music.getName(),
        album_id: music.getAlbum()
      }).into(MusicDatabase.TABLE_NAME)
      
  }

  public async getMusicById(id: string): Promise<Music | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ id })
    return this.toModel(result[0])
  }

  public async deleteMusic(id: string): Promise<void> {
    const result = await this.getConnection()
    .delete()
    .from(MusicDatabase.TABLE_NAME)
    .where({id})
  }

}