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
exports.MusicController = void 0;
const MusicBusiness_1 = require("../business/MusicBusiness");
const MusicDatabase_1 = require("../data/MusicDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const AlbumDatabase_1 = require("../data/AlbumDatabase");
const idGenerator_1 = require("../services/idGenerator");
const tokenGenerator_1 = require("../services/tokenGenerator");
const BaseDatabase_1 = require("../data/BaseDatabase");
class MusicController {
    createMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization || req.headers.Authorization;
                const result = yield MusicController.musicBusiness.createMusic(req.body.name, req.body.albumId, token);
                res.status(200).send({ message: "Musica criada com sucesso!" });
            }
            catch (err) {
                res.status(err.erroCode || 400).send({
                    message: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getMusicById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization || req.headers.Authorization;
                const result = yield MusicController.musicBusiness.getMusicById(req.params.id, token);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.erroCode || 400).send({
                    message: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.MusicController = MusicController;
MusicController.musicBusiness = new MusicBusiness_1.MusicBusiness(new MusicDatabase_1.MusicDatabase(), new UserDatabase_1.UserDatabase(), new AlbumDatabase_1.AlbumDatabase(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator());
