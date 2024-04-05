import express from "express";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/", authenticate, authorizedAdmin, createProduct);

export default router;
