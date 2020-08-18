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
exports.AlbumBusiness = void 0;
const Unauthorized_1 = require("../errors/Unauthorized");
const Album_1 = require("../model/Album");
class AlbumBusiness {
    constructor(albumDatabase, userDatabase, idGenerator, tokenGenerator) {
        this.albumDatabase = albumDatabase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
    }
    createAlbum(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokenGenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN" && (user === null || user === void 0 ? void 0 : user.getRole()) !== "BAND") {
                throw new Unauthorized_1.Unauthorized("You can't create a new album!");
            }
            const idAlbum = this.idGenerator.generate();
            const newBandId = user.getId();
            const album = new Album_1.Album(idAlbum, name, newBandId);
            yield this.albumDatabase.createAlbum(album);
        });
    }
    getAlbumById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokenGenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN" && (user === null || user === void 0 ? void 0 : user.getRole()) !== "BAND") {
                throw new Unauthorized_1.Unauthorized("You can't search any album!");
            }
            return yield this.albumDatabase.getAlbumById(id);
        });
    }
}
exports.AlbumBusiness = AlbumBusiness;
