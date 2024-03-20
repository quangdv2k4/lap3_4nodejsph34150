import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connectdb.js";
import bookRouter from "./routers/book.js";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/api", bookRouter);

export const viteNodeApp = app;
