"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genderRouter = void 0;
const express_1 = __importDefault(require("express"));
const GenderController_1 = require("../controller/GenderController");
exports.genderRouter = express_1.default.Router();
exports.genderRouter.post("/create", new GenderController_1.GenderController().createGender);
exports.genderRouter.get("/all", new GenderController_1.GenderController().getAllGenders);
exports.genderRouter.get("/name", new GenderController_1.GenderController().getGenderByName);
