"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
const BaseError_1 = require("./BaseError/BaseError");
class Forbidden extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
