import dotenv from 'dotenv';
import express from "express";
import path from 'path';
import db from './db.js';
import cors from 'cors';
import router from "./routes/userRouter.js";
import {errorHandler} from "./middleware/errorHandlerMiddleWare.js";

dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
app.use(errorHandler);


const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    })
  } catch (e) {
    console.log(e)
  }
}
start();






