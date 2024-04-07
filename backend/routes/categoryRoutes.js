import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";

const router = express.Router();

router.post("/", authenticate, authorizedAdmin, createCategory);

export default router;
