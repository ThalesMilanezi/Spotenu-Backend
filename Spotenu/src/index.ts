import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
// import { userRouter } from "./router/UserRouter";
dotenv.config();
const app = express();

app.use(express.json());

const server = app.listen(3001, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});