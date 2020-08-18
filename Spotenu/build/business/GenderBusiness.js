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
exports.GenderBusiness = void 0;
const Unauthorized_1 = require("../errors/Unauthorized");
const Gender_1 = require("../model/Gender");
class GenderBusiness {
    constructor(genderDataBase, userDatabase, idGenerator, tokengenerator) {
        this.genderDataBase = genderDataBase;
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.tokengenerator = tokengenerator;
    }
    createGender(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokengenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN") {
                throw new Unauthorized_1.Unauthorized("You must be a adminstrator of this page to access this create a gender");
            }
            const idGender = this.idGenerator.generate();
            const gender = new Gender_1.Gender(idGender, name);
            yield this.genderDataBase.createGender(gender);
        });
    }
    getGenderByName(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokengenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN") {
                throw new Unauthorized_1.Unauthorized("You must be a adminstrator of this page to access this create a gender");
            }
            return yield this.genderDataBase.getGenderByName(name);
        });
    }
    getAllGender(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokengenerator.verify(token);
            const user = yield this.userDatabase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN") {
                throw new Unauthorized_1.Unauthorized("You must be a adminstrator of this page to access this create a gender");
            }
            return yield this.genderDataBase.getAllGender();
        });
    }
}
exports.GenderBusiness = GenderBusiness;
