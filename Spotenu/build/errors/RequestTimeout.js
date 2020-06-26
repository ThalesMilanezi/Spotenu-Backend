"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTimeOut = void 0;
const BaseError_1 = require("./BaseError/BaseError");
class RequestTimeOut extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 408);
    }
}
exports.RequestTimeOut = RequestTimeOut;
