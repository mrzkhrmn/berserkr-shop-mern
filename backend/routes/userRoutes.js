import express from "express";
import { updateUserProfile } from "../controllers/userController.js";
import { authenticate } from "../utils/authenticate.js";

const router = express.Router();

router.put("/update/:userId", authenticate, updateUserProfile);

export default router;
