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
exports.GenderDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Gender_1 = require("../model/Gender");
class GenderDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return (dbModel &&
            new Gender_1.Gender(dbModel.id, dbModel.name));
    }
    createGender(gender) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: gender.getid(),
                name: gender.getName()
            })
                .into(GenderDatabase.TABLE_NAME);
        });
    }
    getGenderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('*')
                .from(GenderDatabase.TABLE_NAME)
                .where({ id });
            return this.toModel(result[0]);
        });
    }
    getGenderByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(GenderDatabase.TABLE_NAME)
                .where({ name });
            return this.toModel(result[0]);
        });
    }
    getAllGender() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().raw(`
    SELECT * FROM GenderSpotenu;
    `);
            return result[0].map((item) => this.toModel(item));
        });
    }
}
exports.GenderDatabase = GenderDatabase;
GenderDatabase.TABLE_NAME = "GenderSpotenu";
