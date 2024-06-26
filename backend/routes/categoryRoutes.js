import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";

const router = express.Router();

router.post("/", authenticate, authorizedAdmin, createCategory);
router.get("/", authenticate, authorizedAdmin, getAllCategories);
router.delete("/:id", authenticate, authorizedAdmin, deleteCategory);

export default router;
