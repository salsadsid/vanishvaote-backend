import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
console.log(mongoose.modelNames());
app.get("/", (req, res) => {
  res.send("VanishVote is Running");
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

export default app;
