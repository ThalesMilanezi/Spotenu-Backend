"use strict";
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
    static UserBusiness = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new hashGenerator_1.HashGenerator(), new tokenGenerator_1.TokenGenerator(), new idGenerator_1.IdGenerator());
    async signUpListener(req, res) {
        try {
            const result = await UserController.UserBusiness.signupListener(req.body.name, req.body.email, req.body.nickname, req.body.password, User_1.UserRole.FREE);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async signUpAdmin(req, res) {
        try {
            const result = await UserController.UserBusiness.signupAdmin(req.body.name, req.body.email, req.body.nickname, req.body.password, User_1.UserRole.ADMIN);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async signUpBand(req, res) {
        try {
            const result = await UserController.UserBusiness.signupBand(req.body.name, req.body.email, req.body.nickname, req.body.password, req.body.description);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async login(req, res) {
        try {
            let result;
            if (req.body.userInput.indexOf("@") !== -1) {
                result = await UserController.UserBusiness.login(req.body.userInput, req.body.password);
            }
            if (req.body.userInput) {
                result = await UserController.UserBusiness.login(req.body.userInput, req.body.password);
            }
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async getAllBands(req, res) {
        const token = req.headers.authorization || req.headers.Authorization;
        try {
            const result = await UserController.UserBusiness.getAllBands(token);
            res.status(200).send(result);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async ApproveBand(req, res) {
        const token = req.headers.authorization || req.headers.Authorization;
        try {
            const result = await UserController.UserBusiness.ApproveBand(req.body.id, token);
            res.status(200).send({ message: "banda aprovada com sucesso" });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
    async getUser(req, res) {
        const token = req.headers.authorization || req.headers.Authorization;
        try {
            const result = await UserController.UserBusiness.getUsers(token);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            }
        }
        await BaseDatabase_1.BaseDatabase.destroyConnection();
    }
}
exports.UserController = UserController;
