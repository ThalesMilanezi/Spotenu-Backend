"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderController = void 0;
const GenderBusiness_1 = require("../business/GenderBusiness");
const GenderDatabase_1 = require("../data/GenderDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const idGenerator_1 = require("../services/idGenerator");
const tokenGenerator_1 = require("../services/tokenGenerator");
const BaseDatabase_1 = require("../data/BaseDatabase");
class GenderController {
    static GenderBusiness = new GenderBusiness_1.GenderBusiness(new GenderDatabase_1.GenderDatabase(), new UserDatabase_1.UserDatabase(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator());
    async createGender(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await GenderController.GenderBusiness.createGender(req.body.name, token);
            res.status(200).send({ message: "Parabens, genero criado com sucesso!" });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async getGenderByName(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await GenderController.GenderBusiness.getGenderByName(req.body.name, token);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async getAllGenders(req, res) {
        try {
            const token = req.headers.authorization || req.headers.Authorization;
            const result = await GenderController.GenderBusiness.getAllGender(token);
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
exports.GenderController = GenderController;
