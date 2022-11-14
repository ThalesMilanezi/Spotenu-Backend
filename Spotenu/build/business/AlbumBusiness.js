"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumBusiness = void 0;
const Unauthorized_1 = require("../errors/Unauthorized");
const Album_1 = require("../model/Album");
class AlbumBusiness {
    albumDatabase;
    userDatabase;
    idGenerator;
    tokenGenerator;
    constructor(albumDatabase, userDatabase, idGenerator, tokenGenerator) {
        this.albumDatabase = albumDatabase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
    }
    async createAlbum(name, token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN" && user.getRole() !== "BAND") {
            throw new Unauthorized_1.Unauthorized("You can't create a new album!");
        }
        const idAlbum = this.idGenerator.generate();
        const newBandId = user.getId();
        const album = new Album_1.Album(idAlbum, name, newBandId);
        await this.albumDatabase.createAlbum(album);
    }
    async getAlbumById(id, token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN" && user.getRole() !== "BAND") {
            throw new Unauthorized_1.Unauthorized("You can't search any album!");
        }
        return await this.albumDatabase.getAlbumById(id);
    }
}
exports.AlbumBusiness = AlbumBusiness;
