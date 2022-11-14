"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderBusiness = void 0;
const Unauthorized_1 = require("../errors/Unauthorized");
const Gender_1 = require("../model/Gender");
class GenderBusiness {
    genderDataBase;
    userDatabase;
    idGenerator;
    tokengenerator;
    constructor(genderDataBase, userDatabase, idGenerator, tokengenerator) {
        this.genderDataBase = genderDataBase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokengenerator = tokengenerator;
    }
    async createGender(name, token) {
        const verifyUser = this.tokengenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN") {
            throw new Unauthorized_1.Unauthorized("You must be a adminstrator of this page to access this create a gender");
        }
        const idGender = this.idGenerator.generate();
        const gender = new Gender_1.Gender(idGender, name);
        await this.genderDataBase.createGender(gender);
    }
    async getGenderByName(name, token) {
        const verifyUser = this.tokengenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN") {
            throw new Unauthorized_1.Unauthorized("You must be a adminstrator of this page to access this create a gender");
        }
        return await this.genderDataBase.getGenderByName(name);
    }
    async getAllGender(token) {
        const verifyUser = this.tokengenerator.verify(token);
        const user = await this.userDatabase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN") {
            throw new Unauthorized_1.Unauthorized("You must be a adminstrator of this page to access this create a gender");
        }
        return await this.genderDataBase.getAllGender();
    }
}
exports.GenderBusiness = GenderBusiness;
