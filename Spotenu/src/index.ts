import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./router/UserRouter";
import cors from "cors";
import { genderRouter } from "./router/GenderRouter";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRouter)
app.use("/gender", genderRouter)


export default app