import express from "express";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use("/api/auth", authRouter);

app.listen("9000", () => {
  console.log("Server is running on port 9000");
});
