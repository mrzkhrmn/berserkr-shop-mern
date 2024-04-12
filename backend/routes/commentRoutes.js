import express from "express";
import { authenticate } from "../utils/authenticate.js";
import { createComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", authenticate, createComment);

export default router;
