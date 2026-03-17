import express from "express";
import { verifyDonor } from "../controllers/adminController.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import { createHospital } from "../controllers/authController.js";

const router = express.Router();
router.put("/verify-donor/:userId", adminOnly , verifyDonor);
router.post("/auth/hospital/register" , adminOnly , createHospital)


export default router;