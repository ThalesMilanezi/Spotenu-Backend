"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Music_1 = require("../model/Music");
class MusicDatabase extends BaseDatabase_1.BaseDatabase {
    static TABLE_NAME = "MusicSpotenu";
    toModel(dbModel) {
        return (dbModel &&
            new Music_1.Music(dbModel.id, dbModel.name, dbModel.album));
    }
    async createMusic(music) {
        await this.getConnection()
            .insert({
            id: music.getId(),
            name: music.getName(),
            album_id: music.getAlbum()
        }).into(MusicDatabase.TABLE_NAME);
    }
    async getMusicById(id) {
        const result = await this.getConnection()
            .select("*")
            .from(MusicDatabase.TABLE_NAME)
            .where({ id });
        return this.toModel(result[0]);
    }
    async deleteMusic(id) {
        const result = await this.getConnection()
            .delete()
            .from(MusicDatabase.TABLE_NAME)
            .where({ id });
    }
}
exports.MusicDatabase = MusicDatabase;
