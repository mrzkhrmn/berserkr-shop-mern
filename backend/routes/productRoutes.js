import express from "express";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", authenticate, authorizedAdmin, createProduct);
router.get("/", authenticate, authorizedAdmin, getAllProducts);

export default router;
