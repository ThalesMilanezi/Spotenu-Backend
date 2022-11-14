"use strict";
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
    static musicBusiness = new MusicBusiness_1.MusicBusiness(new MusicDatabase_1.MusicDatabase(), new UserDatabase_1.UserDatabase(), new AlbumDatabase_1.AlbumDatabase(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator());
    async createMusic(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await MusicController.musicBusiness.createMusic(req.body.name, req.body.albumId, token);
            res.status(200).send({ message: "Musica criada com sucesso!" });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async getMusicById(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await MusicController.musicBusiness.getMusicById(req.params.id, token);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async deleteMusic(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await MusicController.musicBusiness.deleteMusic(req.body.id, token);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
    }
}
exports.MusicController = MusicController;
