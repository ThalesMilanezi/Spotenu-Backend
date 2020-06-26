"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const BaseError_1 = require("./BaseError/BaseError");
class Unauthorized extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
