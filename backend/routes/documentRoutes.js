import express from "express";
import upload from "../middleware/upload.js";
import { uploadBloodReport } from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("document"),
  uploadBloodReport
);

export default router;