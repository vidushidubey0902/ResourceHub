import express from "express";
import rateLimit from "express-rate-limit";

import { protect } from "../middleware/authMiddleware.js";
import {
  addResourceRating,
  createResource,
  deleteResource,
  getResourceById,
  getResources,
  updateResource,
  getResourcesByTag,
  getUserReview,
  getLatestComments,
  getTotalViewsById,
  getTopMonthlyViewedResources,
} from "../controllers/resourceController.js";

const router = express.Router();

const createResourceRateLimiter = rateLimit({
  windowMs: 15 * 60 * 60,
  limit: 20,
  message: "Too many requests to create collections, please try again later.",
});

router
  .route("/")
  .post(protect, createResourceRateLimiter, createResource)
  .get(protect, getResources);
router.get("/:tag", protect, getResourcesByTag);
router.put("/details/:id", protect, getResourceById);
router
  .route("/:id/modify")
  .put(protect, updateResource)
  .delete(protect, deleteResource);
router.route("/:id/rating").post(protect, addResourceRating);
router.get("/:id/get-review", protect, getUserReview);
router.get("/:id/latest-comments", protect, getLatestComments);
router.get("/:id/total-views", protect, getTotalViewsById);
router.get("/top/monthly", protect, getTopMonthlyViewedResources);

export default router;
