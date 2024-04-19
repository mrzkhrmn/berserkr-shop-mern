import express from "express";
import { authenticate } from "../utils/authenticate.js";
import {
  createComment,
  deleteComment,
  getProductComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", authenticate, createComment);
router.get("/:id", authenticate, getProductComments);
router.delete("/:commentId", authenticate, deleteComment);

export default router;
