"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const InvalidParameters_1 = require("../errors/InvalidParameters");
const Unauthorized_1 = require("../errors/Unauthorized");
const User_1 = require("../model/User");
const Forbidden_1 = require("../errors/Forbidden");
const Sucess_1 = require("../errors/Sucess");
class UserBusiness {
    userDataBase;
    hashGenerator;
    tokenGenerator;
    idGenerator;
    constructor(userDataBase, hashGenerator, tokenGenerator, idGenerator) {
        this.userDataBase = userDataBase;
        this.hashGenerator = hashGenerator;
        this.tokenGenerator = tokenGenerator;
        this.idGenerator = idGenerator;
    }
    async signupListener(name, email, nickname, password, role) {
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
        const cryptedPassword = await this.hashGenerator.hash(password);
        const user = new User_1.User(id, name, email, nickname, cryptedPassword, (0, User_1.stringToUserRole)(role));
        await this.userDataBase.createUser(user);
        const acessToken = this.tokenGenerator.generate({
            id, role
        });
        return { acessToken };
    }
    async signupAdmin(name, email, nickname, password, role) {
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
        const cryptedPassword = await this.hashGenerator.hash(password);
        await this.userDataBase.createUser(new User_1.User(id, name, email, nickname, cryptedPassword, (0, User_1.stringToUserRole)(role)));
        const acessToken = this.tokenGenerator.generate({
            id, role
        });
        return { acessToken };
    }
    async signupBand(name, email, nickname, password, description) {
        if (name === undefined ||
            email === undefined ||
            nickname === undefined ||
            password === undefined ||
            description === undefined) {
            throw new InvalidParameters_1.InvalidParameterError("Missing inputs, check the requireds inputs and try again!");
        }
        if (password.length < 6) {
            throw new Unauthorized_1.Unauthorized("The password has to been at least 6 characters");
        }
        if (email.indexOf("@") === -1) {
            throw new InvalidParameters_1.InvalidParameterError("Check the email format and try again.");
        }
        let role = User_1.UserRole.BAND;
        const id = this.idGenerator.generate();
        const cryptedPassword = await this.hashGenerator.hash(password);
        const newBand = new User_1.User(id, name, email, nickname, cryptedPassword, role, description);
        await this.userDataBase.createBand(newBand);
        if (newBand.getisApproved() === undefined) {
            throw new Sucess_1.Sucess("Sua Banda foi criada com sucesso, no entanto é necessário esperar a aprovação dos administradores");
        }
    }
    async login(userInput, password) {
        if (!userInput || !password) {
            throw new InvalidParameters_1.InvalidParameterError("Missing inputs, check the requireds inputs and try again!");
        }
        let user;
        if (userInput.indexOf("@") !== -1) {
            user = await this.userDataBase.getUserByEmail(userInput);
        }
        else {
            user = await this.userDataBase.getUserByNickname(userInput);
        }
        if (!user) {
            throw new Error("This user is not found in our site, try again");
        }
        const correctPassword = await this.hashGenerator.compareHash(password, user.getPassword());
        if (!correctPassword) {
            throw new Unauthorized_1.Unauthorized("Some credencials are incorrect");
        }
        const acessToken = this.tokenGenerator.generate({
            id: user.getId(),
            role: user.getRole()
        });
        return { acessToken };
    }
    async ApproveBand(id, token) {
        const verifyUser = this.tokenGenerator.verify(token);
        await this.userDataBase.getUserById(verifyUser.id);
        await this.userDataBase.getUserById(id);
        await this.userDataBase.approveBand(id);
    }
    async getAllBands(token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDataBase.getUserById(verifyUser.id);
        if (!user) {
            throw new Error('User not found in database');
        }
        if (user.getRole() !== "ADMIN") {
            throw new Unauthorized_1.Unauthorized("You must be admin to see all bands");
        }
        const bands = await this.userDataBase.getAllBands();
        return bands;
    }
    async getUsers(token) {
        const verifyUser = this.tokenGenerator.verify(token);
        const user = await this.userDataBase.getUserById(verifyUser.id);
        const getUser = await this.userDataBase.getUserById(user.getId());
        return getUser;
    }
}
exports.UserBusiness = UserBusiness;
