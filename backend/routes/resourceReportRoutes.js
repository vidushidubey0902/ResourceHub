import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  getReports,
  reportResource,
  updateResourceStatus,
} from "../controllers/resourceReportController.js";

const router = express.Router();

router.route("/").post(protect, reportResource).get(protect, admin, getReports);
router.route("/:id").put(protect, admin, updateResourceStatus);

export default router;
