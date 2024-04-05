import express from "express";
import { authenticate } from "../utils/authenticate";

const router = express.Router();

router.post("/", authenticate);
