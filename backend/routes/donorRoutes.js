import express from "express";
import { getLeaderboard, toggleAvailability } from "../controllers/donorController.js";
import { protect } from "../middleware/authMiddleware.js";
import { findAllDonors , findDonorsByBloodGroup } from "../controllers/donorController.js";

const router = express.Router();

router.put("/toggle-availability", protect, toggleAvailability);
router.get("/all", findAllDonors);
router.get("/find", findDonorsByBloodGroup);
router.get('/leaderboard' , getLeaderboard)


export default router;