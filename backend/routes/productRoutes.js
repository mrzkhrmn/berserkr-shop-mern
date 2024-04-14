import express from "express";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getJewelryProducts,
  getProductById,
  getWearProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", authenticate, authorizedAdmin, createProduct);
router.get("/", authenticate, authorizedAdmin, getAllProducts);
router.get("/product/:id", getProductById);
router.get("/taki", getJewelryProducts);
router.get("/giyim", getWearProducts);
router.put("/:id", authenticate, authorizedAdmin, updateProduct);
router.delete("/:id", authenticate, authorizedAdmin, deleteProduct);

export default router;
