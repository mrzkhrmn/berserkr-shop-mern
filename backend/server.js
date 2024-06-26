import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import connectDatabase from "./db/connectDatabase.js";

import path from "path";

dotenv.config();

const app = express();

app.listen("9000", () => {
  console.log("Server is running on port 9000");
  connectDatabase();
});

const __dirname = path.resolve();

app.use(cors());
app.use(cookieParser());
app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in the req.body

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
