"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = require("knex");
class BaseDatabase {
    static connection = null;
    convertTinyintToBoolean(value) {
        return value === 1;
    }
    convertBooleanToTinyint(value) {
        return value ? 1 : 0;
    }
    getConnection() {
        if (BaseDatabase.connection === null) {
            BaseDatabase.connection = (0, knex_1.knex)({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: Number(process.env.PORT || "3306"),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                },
            });
        }
        return BaseDatabase.connection;
    }
    static async destroyConnection() {
        if (BaseDatabase.connection) {
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }
}
exports.BaseDatabase = BaseDatabase;
