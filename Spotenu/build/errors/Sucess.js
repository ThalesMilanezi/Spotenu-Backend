"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucess = void 0;
const BaseError_1 = require("./BaseError/BaseError");
class Sucess extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 200);
    }
}
exports.Sucess = Sucess;
