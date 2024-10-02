import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getFavoriteResources,
  removeAllFavoriteResources,
  getCreatedResources,
  addFavoriteResource,
  removeFavoriteResource,
  checkIfResourceFavorited,
  getUserContributions,
  getUserStats,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/favorites/resources/:id")
  .post(protect, addFavoriteResource)
  .delete(protect, removeFavoriteResource);
router
  .route("/favorites/resources")
  .get(protect, getFavoriteResources)
  .put(protect, removeAllFavoriteResources);
router.route("/created-resources").get(protect, getCreatedResources);
router
  .route("/favorites/resources/check/:id")
  .get(protect, checkIfResourceFavorited);
router.get("/get-contributions", protect, getUserContributions);
router.put("/get-stats", protect, getUserStats);

export default router;
