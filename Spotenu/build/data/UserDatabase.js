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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return (dbModel &&
            new User_1.User(dbModel.id, dbModel.name, dbModel.email, dbModel.nickname, dbModel.password, dbModel.role, dbModel.description));
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword(),
                role: user.getRole()
            })
                .into(UserDatabase.TABLE_NAME);
        });
    }
    createBand(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword(),
                role: user.getRole(),
                is_approved: user.getisApproved(),
                description: user.getDescription()
            })
                .into(UserDatabase.TABLE_NAME);
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`
    UPDATE UserSpotenu
    SET is_approved = 0
    WHERE id = ${id};
  `);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ email });
            return this.toModel(result[0]);
        });
    }
    getUserByNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ nickname });
            return this.toModel(result[0]);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ id });
            return this.toModel(result[0]);
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE role = "BAND"
    `);
            return result[0].filter((item) => this.toModel(item));
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "UserSpotenu";
