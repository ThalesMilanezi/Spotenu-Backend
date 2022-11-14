"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
const AlbumBusiness_1 = require("../business/AlbumBusiness");
const AlbumDatabase_1 = require("../data/AlbumDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const idGenerator_1 = require("../services/idGenerator");
const tokenGenerator_1 = require("../services/tokenGenerator");
const BaseDatabase_1 = require("../data/BaseDatabase");
class AlbumController {
    static AlbumBusiness = new AlbumBusiness_1.AlbumBusiness(new AlbumDatabase_1.AlbumDatabase(), new UserDatabase_1.UserDatabase(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator());
    async createAlbum(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await AlbumController.AlbumBusiness.createAlbum(req.body.name, token);
            res.status(200).send({ message: "Album criado com sucesso!" });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async getAlbumById(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await AlbumController.AlbumBusiness.getAlbumById(req.body.id, token);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
}
exports.AlbumController = AlbumController;
