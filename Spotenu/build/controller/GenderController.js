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
exports.GenderController = void 0;
const GenderBusiness_1 = require("../business/GenderBusiness");
const GenderDatabase_1 = require("../data/GenderDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const idGenerator_1 = require("../services/idGenerator");
const tokenGenerator_1 = require("../services/tokenGenerator");
const BaseDatabase_1 = require("../data/BaseDatabase");
class GenderController {
    createGender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield GenderController.GenderBusiness.createGender(req.body.name, token);
                res.status(200).send({ message: "Parabens, genero criado com sucesso!" });
            }
            catch (err) {
                res.status(err.erroCode || 400).send({
                    message: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getGenderByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield GenderController.GenderBusiness.getGenderByName(req.body.name, token);
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
    getAllGenders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield GenderController.GenderBusiness.getAllGender(token);
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
exports.GenderController = GenderController;
GenderController.GenderBusiness = new GenderBusiness_1.GenderBusiness(new GenderDatabase_1.GenderDatabase(), new UserDatabase_1.UserDatabase(), new idGenerator_1.IdGenerator(), new tokenGenerator_1.TokenGenerator());
