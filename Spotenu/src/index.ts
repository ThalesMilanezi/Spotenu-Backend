import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./router/UserRouter";
import cors from "cors";
import { genderRouter } from "./router/GenderRouter";
import { albumRouter } from "./router/AlbumRouter";
import { musicRouter } from "./router/MusicRouter";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRouter)
app.use("/gender", genderRouter)
app.use("/album", albumRouter)
app.use("/music",musicRouter)


export default app