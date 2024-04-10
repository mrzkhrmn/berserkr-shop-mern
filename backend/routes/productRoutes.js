import express from "express";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", authenticate, authorizedAdmin, createProduct);
router.get("/", authenticate, authorizedAdmin, getAllProducts);
router.put("/:id", authenticate, authorizedAdmin, updateProduct);

export default router;
