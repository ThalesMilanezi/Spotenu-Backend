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
exports.UserBusiness = void 0;
const InvalidParameters_1 = require("../errors/InvalidParameters");
const Unauthorized_1 = require("../errors/Unauthorized");
const User_1 = require("../model/User");
const Forbidden_1 = require("../errors/Forbidden");
class UserBusiness {
    constructor(userDataBase, hashGenerator, tokenGenerator, idGenerator) {
        this.userDataBase = userDataBase;
        this.hashGenerator = hashGenerator;
        this.tokenGenerator = tokenGenerator;
        this.idGenerator = idGenerator;
    }
    signupListener(name, email, nickname, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !nickname || !password) {
                throw new InvalidParameters_1.InvalidParameterError("Missing inputs, check the requireds inputs and try again!");
            }
            if (password.length < 6) {
                throw new Unauthorized_1.Unauthorized("The password has to been at least 6 characters");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidParameters_1.InvalidParameterError("Check the email format and try again.");
            }
            const id = this.idGenerator.generate();
            const cryptedPassword = yield this.hashGenerator.hash(password);
            const user = new User_1.User(id, name, email, nickname, cryptedPassword, User_1.stringToUserRole(role));
            yield this.userDataBase.createUser(user);
            const acessToken = this.tokenGenerator.generate({
                id, role
            });
            return { acessToken };
        });
    }
    signupAdmin(name, email, nickname, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !nickname || !password) {
                throw new InvalidParameters_1.InvalidParameterError("Missing inputs, check the requireds inputs and try again!");
            }
            if (password.length < 10) {
                throw new Unauthorized_1.Unauthorized("The password has to been at least 10 characters");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidParameters_1.InvalidParameterError("Check the email format and try again.");
            }
            if (role !== User_1.UserRole.ADMIN) {
                throw new Forbidden_1.Forbidden("You must be admin to create a new admin");
            }
            const id = this.idGenerator.generate();
            const cryptedPassword = yield this.hashGenerator.hash(password);
            yield this.userDataBase.createUser(new User_1.User(id, name, email, nickname, cryptedPassword, User_1.stringToUserRole(role)));
            const acessToken = this.tokenGenerator.generate({
                id, role
            });
            return { acessToken };
        });
    }
    signupBand(name, email, nickname, password, role, description, isApproved) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !nickname || !password || !role || !description) {
                throw new InvalidParameters_1.InvalidParameterError("Missing inputs, check the requireds inputs and try again!");
            }
            if (password.length < 6) {
                throw new Unauthorized_1.Unauthorized("The password has to been at least 6 characters");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidParameters_1.InvalidParameterError("Check the email format and try again.");
            }
            const id = this.idGenerator.generate();
            const cryptedPassword = yield this.hashGenerator.hash(password);
            yield this.userDataBase.createUser(new User_1.User(id, name, email, nickname, cryptedPassword, User_1.stringToUserRole(role), isApproved, description));
            const acessToken = this.tokenGenerator.generate({
                id, role
            });
            // if (!isApproved) {
            //   throw new Forbidden("Your band is not approved yet, check again later")
            // } else {
            //   return { acessToken }
            // }
        });
    }
    login(userInput, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInput || !password) {
                throw new InvalidParameters_1.InvalidParameterError("Missing inputs, check the requireds inputs and try again!");
            }
            const user = yield this.userDataBase.getUserByEmail(userInput);
            if (userInput.indexOf("@")) {
                const correctPassword = yield this.hashGenerator.compareHash(password, user.getPassword());
                if (!correctPassword) {
                    throw new Unauthorized_1.Unauthorized("Some credencials are incorrect 1");
                }
                const acessToken = this.tokenGenerator.generate({
                    id: user.getId(),
                    role: user.getRole()
                });
                return { acessToken };
            }
            else {
                const correctPassword = yield this.hashGenerator.compareHash(password, user.getPassword());
                if (!correctPassword) {
                    throw new Unauthorized_1.Unauthorized("Some credencials are incorrect 2");
                }
                const acessToken = this.tokenGenerator.generate({
                    id: user.getId(),
                    role: user.getRole()
                });
                return { acessToken };
            }
        });
    }
    ApproveBand(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokenGenerator.verify(token);
            const user = yield this.userDataBase.getUserById(verifyUser.id);
            const band = yield this.userDataBase.getUserById(id);
            yield this.userDataBase.approveBand(id);
        });
    }
    getAllBands(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUser = this.tokenGenerator.verify(token);
            const user = yield this.userDataBase.getUserById(verifyUser.id);
            if ((user === null || user === void 0 ? void 0 : user.getRole()) !== "ADMIN") {
                throw new Unauthorized_1.Unauthorized("You must be admin to see all bands");
            }
            const bands = yield this.userDataBase.getAllBands();
            return bands;
        });
    }
}
exports.UserBusiness = UserBusiness;
