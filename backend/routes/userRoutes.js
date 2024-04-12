import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import { authenticate, authorizedAdmin } from "../utils/authenticate.js";

const router = express.Router();

router.put("/update/:userId", authenticate, updateUserProfile);
router.delete("/delete/:userId", authenticate, deleteUser);
router.get("/", authenticate, authorizedAdmin, getAllUsers);

export default router;
