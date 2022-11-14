"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    static TABLE_NAME = "UserSpotenu";
    toModel(dbModel) {
        return (dbModel &&
            new User_1.User(dbModel.id, dbModel.name, dbModel.email, dbModel.nickname, dbModel.password, dbModel.role, dbModel.is_approved, dbModel.description));
    }
    async createUser(user) {
        await this.getConnection()
            .insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            nickname: user.getNickname(),
            password: user.getPassword(),
            role: user.getRole()
        })
            .into(UserDatabase.TABLE_NAME);
    }
    async createBand(user) {
        await this.getConnection()
            .insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            nickname: user.getNickname(),
            password: user.getPassword(),
            role: user.getRole(),
            description: user.getDescription(),
            is_approved: user.getisApproved()
        })
            .into(UserDatabase.TABLE_NAME);
    }
    async approveBand(id) {
        await this.getConnection().raw(`
    UPDATE UserSpotenu
    SET is_approved = 1
    WHERE id = "${id}";
  `);
    }
    async getUserByEmail(email) {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });
        return this.toModel(result[0]);
    }
    async getUserByNickname(nickname) {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ nickname });
        return this.toModel(result[0]);
    }
    async getUserById(id) {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id });
        return this.toModel(result[0]);
    }
    async getAllBands() {
        const result = await this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE role = "BAND"
    `);
        return result[0].map((item) => this.toModel(item));
    }
}
exports.UserDatabase = UserDatabase;
