"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Album_1 = require("../model/Album");
class AlbumDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return (dbModel &&
            new Album_1.Album(dbModel.id, dbModel.name, dbModel.band));
    }
    createAlbum(album) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: album.getid(),
                name: album.getName(),
                band_id: album.getBand()
            })
                .into(AlbumDatabase.TABLE_NAME);
        });
    }
    getAlbumById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(AlbumDatabase.TABLE_NAME)
                .where({ id });
            return this.toModel(result[0]);
        });
    }
}
exports.AlbumDatabase = AlbumDatabase;
AlbumDatabase.TABLE_NAME = "AlbumSpotenu";
