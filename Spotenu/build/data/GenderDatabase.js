"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Gender_1 = require("../model/Gender");
class GenderDatabase extends BaseDatabase_1.BaseDatabase {
    static TABLE_NAME = "GenderSpotenu";
    toModel(dbModel) {
        return (dbModel &&
            new Gender_1.Gender(dbModel.id, dbModel.name));
    }
    async createGender(gender) {
        await this.getConnection()
            .insert({
            id: gender.getid(),
            name: gender.getName()
        })
            .into(GenderDatabase.TABLE_NAME);
    }
    async getGenderById(id) {
        const result = await this.getConnection()
            .select('*')
            .from(GenderDatabase.TABLE_NAME)
            .where({ id });
        return this.toModel(result[0]);
    }
    async getGenderByName(name) {
        const result = await this.getConnection()
            .select("*")
            .from(GenderDatabase.TABLE_NAME)
            .where({ name });
        return this.toModel(result[0]);
    }
    async getAllGender() {
        const result = await this.getConnection().raw(`
    SELECT * FROM GenderSpotenu;
    `);
        return result[0].map((item) => this.toModel(item));
    }
}
exports.GenderDatabase = GenderDatabase;
