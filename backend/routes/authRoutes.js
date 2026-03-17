import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  createHospital,
  createBloodBank,
  getMe
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

router.post("/admin/create-hospital",
  protect,
  adminOnly,
  createHospital
);

router.post("/admin/create-bloodbank",
  protect,
  adminOnly,
  createBloodBank
);

export default router;