"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToUserRole = exports.UserRole = exports.User = void 0;
const NotFoundError_1 = require("../errors/NotFoundError");
class User {
    id;
    name;
    email;
    nickname;
    password;
    role;
    description;
    isApproved;
    constructor(id, name, email, nickname, password, role, description, isApproved) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.role = role;
        this.description = description;
        this.isApproved = isApproved;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getNickname() {
        return this.nickname;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getDescription() {
        return this.description;
    }
    getisApproved() {
        return this.isApproved;
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["FREE"] = "FREE";
    UserRole["PREMIUM"] = "PREMIUM";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["BAND"] = "BAND";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const stringToUserRole = (input) => {
    switch (input) {
        case "FREE":
            return UserRole.FREE;
        case "PREMIUM":
            return UserRole.PREMIUM;
        case "ADMIN":
            return UserRole.ADMIN;
        case "BAND":
            return UserRole.BAND;
        default:
            throw new NotFoundError_1.NotFoundError("The specific user role was not found.");
    }
};
exports.stringToUserRole = stringToUserRole;
