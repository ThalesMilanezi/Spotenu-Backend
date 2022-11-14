"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Album_1 = require("../model/Album");
class AlbumDatabase extends BaseDatabase_1.BaseDatabase {
    static TABLE_NAME = "AlbumSpotenu";
    toModel(dbModel) {
        return (dbModel &&
            new Album_1.Album(dbModel.id, dbModel.name, dbModel.band));
    }
    async createAlbum(album) {
        await this.getConnection()
            .insert({
            id: album.getid(),
            name: album.getName(),
            band_id: album.getBand()
        })
            .into(AlbumDatabase.TABLE_NAME);
    }
    async getAlbumById(id) {
        const result = await this.getConnection()
            .select("*")
            .from(AlbumDatabase.TABLE_NAME)
            .where({ id });
        return this.toModel(result[0]);
    }
}
exports.AlbumDatabase = AlbumDatabase;
