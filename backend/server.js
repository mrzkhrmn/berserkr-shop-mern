import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import connectDatabase from "./db/connectDatabase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in the req.body

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen("9000", () => {
  console.log("Server is running on port 9000");
  connectDatabase();
});
