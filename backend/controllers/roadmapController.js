import asyncHandler from "express-async-handler";
import Roadmap from "../models/roadmapModel.js";
import validateRoadmapFields from "../utils/validateRoadmapFields.js";
import {
  calculateAverageRating,
  calculateRatingBreakdown,
} from "../utils/calculateRatings.js";
import User from "../models/userModel.js";

// @desc Get all roadmaps
// @route GET /api/roadmaps
// @access Public
const getRoadmaps = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const searchQuery = req.query.search || "";
  const sort = req.query.sort || "recent";
  const filter = req.query.filter || "highest";

  const searchCriteria = searchQuery
    ? {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { tags: { $regex: searchQuery, $options: "i" } },
        ],
      }
    : {};

  let sortCriteria = {};

  if (sort === "recent") {
    sortCriteria.createdAt = -1;
  } else if (sort === "oldest") {
    sortCriteria.createdAt = 1;
  }

  const count = await Roadmap.countDocuments({
    ...searchCriteria,
  });

  let roadmaps = await Roadmap.find({
    ...searchCriteria,
  })
    .sort(sortCriteria)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (filter === "highest") {
    roadmaps = roadmaps.sort((a, b) => b.averageRating - a.averageRating);
  } else if (filter === "lowest") {
    roadmaps = roadmaps.sort((a, b) => a.averageRating - b.averageRating);
  }

  res.status(200).json({ roadmaps, page, pages: Math.ceil(count / pageSize) });
});

// @desc Create a roadmap
// @route POST /api/roadmaps
// @access Private
const createRoadmap = asyncHandler(async (req, res) => {
  const { title, description, tags, steps } = req.body;

  try {
    validateRoadmapFields(title, description, tags, steps);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

  const isAdmin = req.user.isAdmin;

  const roadmap = new Roadmap({
    user: req.user._id,
    authorName: req.user.name,
    title,
    description,
    tags,
    steps,
    isOfficial: isAdmin ? true : false,
  });

  const createdRoadmap = await roadmap.save();

  req.user.createdRoadmaps.push(createdRoadmap._id);
  await req.user.save();

  res.status(201).json(createdRoadmap);
});

// @desc Get roadmap by roadmap ID
// @route GET /api/roadmaps/:id
// @access Public
const getRoadmapById = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (req.user && req.user._id.toString() !== roadmap.user.toString()) {
      roadmap.totalViews += 1;
      roadmap.monthlyViews += 1;
      await roadmap.save();
    }

    res.status(200).json(roadmap);
  } else {
    res.status(404);
    throw new Error("Roadmap not found");
  }
});

// @desc Update an existing roadmap
// @route PUT /api/roadmaps/:id/modify
// @access Private
const updateRoadmap = asyncHandler(async (req, res) => {
  const { title, description, tags, steps } = req.body;

  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (roadmap.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this roadmap");
    }

    roadmap.title = title || roadmap.title;
    roadmap.description = description || roadmap.description;
    roadmap.tags = tags || roadmap.tags;
    roadmap.steps = steps || roadmap.steps;

    const updatedRoadmap = await roadmap.save();
    res.json(updatedRoadmap);
  } else {
    res.status(404);
    throw new Error("Roadmap not found");
  }
});

// @desc Delete a roadmap
// @route DELETE /api/roadmaps/:id/modify
// @access Private
const deleteRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (roadmap.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this roadmap");
    }
    await Roadmap.deleteOne({ _id: req.params.id });
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { createdRoadmaps: req.params.id } }
    );
    res.json({ message: "Roadmap removed" });
  } else {
    res.status(404);
    throw new Error("Roadmap not found");
  }
});

// @desc Add a rating / comment to a roadmap
// @route POST /api/roadmaps/:id/rating
// @access Private
const addRoadmapRating = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    throw new Error("Both rating and comment need to be provided");
  }

  if (rating > 5 || rating < 0) {
    throw new Error("Rating needs to be between 0 and 5");
  }

  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (roadmap.user.toString() === req.user._id.toString()) {
      res.status(403);
      throw new Error("You cannot rate or comment on your own roadmap");
    }

    const alreadyRated = roadmap.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyRated) {
      res.status(400);
      throw new Error("You've already rated this roadmap");
    }

    const ratingObject = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };
    roadmap.ratings.push(ratingObject);

    roadmap.averageRating = calculateAverageRating(roadmap.ratings);
    roadmap.ratingBreakdown = calculateRatingBreakdown(roadmap.ratings);

    await roadmap.save();
    res.status(201).json({ message: "Rating added" });
  } else {
    res.status(404);
    throw new Error("Roadmap not found");
  }
});

// @desc Get roadmaps by tag
// @route GET /api/roadmaps/tag/:tag
// @access Public
const getRoadmapsByTag = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const tagId = req.params.tag;

  const count = await Roadmap.countDocuments({ tags: { $in: [tagId] } });
  const roadmaps = await Roadmap.find({ tags: { $in: [tagId] } })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ roadmaps, page, pages: Math.ceil(count / pageSize) });
});

// @desc Get user review of a roadmap
// @route GET /api/roadmaps/:id/get-review
// @access Private
const getUserReview = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (!roadmap) {
    res.status(404);
    throw new Error("Roadmap not found");
  }

  const userReview = roadmap.ratings.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (userReview) {
    res.status(200).json(userReview);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

// @desc Get latest comments of a roadmap
// @route GET /api/roadmaps/:id/latest-comments
// @access Private
const getLatestComments = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (!roadmap) {
    res.status(404);
    throw new Error("Roadmap not found");
  }

  const latestComments = roadmap.ratings
    .filter((rating) => rating.comment)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);

  res.status(200).json(latestComments);
});

// @desc Get total views of a roadmap
// @route GET /api/roadmaps/:id/total-views
// @access Private
const getTotalViewsById = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (roadmap.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to see the total views of this roadmap");
    }

    res.status(200).json({ totalViews: roadmap.totalViews });
  } else {
    res.status(404);
    throw new Error("Roadmap not found");
  }
});

// @desc Get top 6 viewed roadmaps of the month
// @route GET /api/roadmaps/top/monthly
// @access Private
const getTopMonthlyViewedRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await Roadmap.find().sort({ monthlyViews: -1 }).limit(6);

  res.status(200).json(roadmaps);
});

export {
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
};
