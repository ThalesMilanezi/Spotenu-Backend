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
exports.UserController = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const hashGenerator_1 = require("../services/hashGenerator");
const tokenGenerator_1 = require("../services/tokenGenerator");
const idGenerator_1 = require("../services/idGenerator");
const UserBusiness_1 = require("../business/UserBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
const User_1 = require("../model/User");
class UserController {
    signUpListener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserController.UserBusiness.signupListener(req.body.name, req.body.email, req.body.nickname, req.body.password, User_1.UserRole.FREE);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.erroCode || 400).send({ message: err.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    signUpAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserController.UserBusiness.signupListener(req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.role);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.erroCode || 400).send({ message: err.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    signUpBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserController.UserBusiness.signupBand(req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.role, req.body.description, req.body.isApproved);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.erroCode || 400).send({ message: err.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserController.UserBusiness.login(req.body.emailOrNickname, req.body.password);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.erroCode || 400).send({ message: err.message });
            }
        });
    }
    getAllBands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const result = yield UserController.UserBusiness.getAllBands(token);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
    ApproveBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const result = yield UserController.UserBusiness.ApproveBand(req.body.id, token);
                res.status(200).send({ message: "banda aprovada com sucesso" });
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
}
exports.UserController = UserController;
UserController.UserBusiness = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new hashGenerator_1.HashGenerator(), new tokenGenerator_1.TokenGenerator(), new idGenerator_1.IdGenerator());
