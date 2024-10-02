import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();
import {
  createRoadmap,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
  addRoadmapRating,
  getRoadmapsByTag,
  getUserReview,
  getLatestComments,
  getTotalViewsById,
  getTopMonthlyViewedRoadmaps,
  getRoadmaps,
} from '../controllers/roadmapController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createRoadmap).get(protect, getRoadmaps);
router
  .route("/:id")
  .get(protect, getRoadmapById)
  .put(protect, updateRoadmap)
  .delete(protect, deleteRoadmap);
router.route("/:id/rate").post(protect, addRoadmapRating);

router.get('/:tag', protect, getRoadmapsByTag);
router.get('/:id/get-review', protect, getUserReview);
router.route('/:id/latest-comments', protect, getLatestComments);
router.get('/:id/total-views', protect, getTotalViewsById);
router.get('/top/monthly', protect, getTopMonthlyViewedRoadmaps);

export default router;


