"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicBusiness = void 0;
const Unauthorized_1 = require("../errors/Unauthorized");
const Music_1 = require("../model/Music");
const NotFoundError_1 = require("../errors/NotFoundError");
class MusicBusiness {
    musicDatabase;
    userDatabase;
    albumDatabase;
    idGenerator;
    tokenGenerator;
    constructor(musicDatabase, userDatabase, albumDatabase, idGenerator, tokenGenerator) {
        this.musicDatabase = musicDatabase;
        this.userDatabase = userDatabase;
        this.albumDatabase = albumDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
    }
    async createMusic(name, albumId, token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN" && user.getRole() !== "BAND") {
            throw new Unauthorized_1.Unauthorized("You can't create a new music!");
        }
        const searchAlbum = await this.albumDatabase.getAlbumById(albumId);
        if (!searchAlbum) {
            throw new Error("This album does not exist, try again!");
        }
        const idMusic = await this.idGenerator.generate();
        const music = new Music_1.Music(idMusic, name, albumId);
        await this.musicDatabase.createMusic(music);
    }
    async getMusicById(id, token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("This user does not exist");
        }
        if (user.getRole() !== "ADMIN" && user.getRole() !== "BAND") {
            throw new Unauthorized_1.Unauthorized("You can't create a new music!");
        }
        await this.musicDatabase.getMusicById(id);
    }
    async deleteMusic(id, token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("This user does not exist");
        }
        await this.musicDatabase.deleteMusic(id);
    }
}
exports.MusicBusiness = MusicBusiness;
