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
exports.MusicBusiness = void 0;
const Unauthorized_1 = require("../errors/Unauthorized");
const Music_1 = require("../model/Music");
class MusicBusiness {
    constructor(musicDatabase, userDatabase, albumDatabase, idGenerator, tokenGenerator) {
        this.musicDatabase = musicDatabase;
        this.userDatabase = userDatabase;
        this.albumDatabase = albumDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
    }
    createMusic(name, albumId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokenGenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN" && (user === null || user === void 0 ? void 0 : user.getRole()) !== "BAND") {
                throw new Unauthorized_1.Unauthorized("You can't create a new music!");
            }
            const searchAlbum = yield this.albumDatabase.getAlbumById(albumId);
            if (!searchAlbum) {
                throw new Error("This album does not exist, try again!");
            }
            const idMusic = yield this.idGenerator.generate();
            const music = new Music_1.Music(idMusic, name, albumId);
            yield this.musicDatabase.createMusic(music);
        });
    }
    getMusicById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokenGenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN" && (user === null || user === void 0 ? void 0 : user.getRole()) !== "BAND") {
                throw new Unauthorized_1.Unauthorized("You can't create a new music!");
            }
            yield this.musicDatabase.getMusicById(id);
        });
    }
}
exports.MusicBusiness = MusicBusiness;
