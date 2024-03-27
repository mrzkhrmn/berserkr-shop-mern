import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import connectDatabase from "./db/connectDatabase.js";

dotenv.config();

const app = express();

app.use(cors());

app.use("/api/auth", authRouter);

app.listen("9000", () => {
  console.log("Server is running on port 9000");
  connectDatabase();
});
