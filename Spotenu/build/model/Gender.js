"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
class Gender {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getid() {
        return this.id;
    }
    getName() {
        return this.name;
    }
}
exports.Gender = Gender;
