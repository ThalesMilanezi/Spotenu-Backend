"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const server = index_1.default.listen(3001, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
