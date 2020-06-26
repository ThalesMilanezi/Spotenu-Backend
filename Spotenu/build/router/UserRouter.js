"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/listener", new UserController_1.UserController().signUpListener);
exports.userRouter.post("/band", new UserController_1.UserController().signUpBand);
exports.userRouter.post("/admin", new UserController_1.UserController().signUpAdmin);
exports.userRouter.post("/login", new UserController_1.UserController().login);
exports.userRouter.get("/bands", new UserController_1.UserController().getAllBands);
exports.userRouter.post("/approvebands", new UserController_1.UserController().ApproveBand);
