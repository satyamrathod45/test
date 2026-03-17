import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createRequest,
  getRecommendedDonors,
  acceptRequest,
  updateDonorLocation,
  completeDonation,
  getMyRequests,
  getMyAcceptedRequests,
  getAllRequests,
  getRequestById
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/", protect, createRequest);

router.get("/my-requests", protect, getMyRequests);

router.get("/all" , protect , getAllRequests)

router.get("/my-accepted", protect, getMyAcceptedRequests);

router.get("/recommendations", protect, getRecommendedDonors);

router.put("/:id/accept", protect, acceptRequest);

router.put("/:requestId/location", protect, updateDonorLocation);

router.put("/:id/complete", protect, completeDonation);
router.get("/:id", protect, getRequestById);

export default router;