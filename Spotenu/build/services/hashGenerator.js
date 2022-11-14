"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashGenerator = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashGenerator {
    hash = async (text) => {
        const rounds = Number(process.env.ROUNDS);
        const salt = await bcryptjs_1.default.genSalt(rounds);
        const result = await bcryptjs_1.default.hash(text, salt);
        return result;
    };
    compareHash = async (text, hash) => {
        return bcryptjs_1.default.compare(text, hash);
    };
}
exports.HashGenerator = HashGenerator;
