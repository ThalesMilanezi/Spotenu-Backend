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
exports.AlbumController = void 0;
const AlbumBusiness_1 = require("../business/AlbumBusiness");
const AlbumDatabase_1 = require("../data/AlbumDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const idGenerator_1 = require("../services/idGenerator");
const tokenGenerator_1 = require("../services/tokenGenerator");
const BaseDatabase_1 = require("../data/BaseDatabase");
class AlbumController {
    createAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield AlbumController.AlbumBusiness.createAlbum(req.body.name, token);
                res.status(200).send({ message: "Album criado com sucesso!" });
            }
            catch (err) {
                res.status(err.erroCode || 400).send({
                    message: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getAlbumById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield AlbumController.AlbumBusiness.getAlbumById(req.body.id, token);
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
exports.AlbumController = AlbumController;
AlbumController.AlbumBusiness = new AlbumBusiness_1.AlbumBusiness(new AlbumDatabase_1.AlbumDatabase(), new UserDatabase_1.UserDatabase(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator());
