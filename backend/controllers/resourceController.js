import asyncHandler from "express-async-handler";
import Resource from "../models/resourceModel.js";
import validateResourceFields from "../utils/validateResourceFields.js";
import {
  calculateAverageRating,
  calculateRatingBreakdown,
} from "../utils/calculateRatings.js";
import User from "../models/userModel.js";

// @desc Get all resources
// @route GET /api/resources
// @access Public
const getResources = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const searchQuery = req.query.search || "";
  const sort = req.query.sort || "recent";
  const filter = req.query.filter || "highest";

  const searchCriteria = searchQuery
    ? {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { languages: { $regex: searchQuery, $options: "i" } },
        ],
      }
    : {};

  let sortCriteria = {};

  if (sort === "recent") {
    sortCriteria.createdAt = -1;
  } else if (sort === "oldest") {
    sortCriteria.createdAt = 1;
  }

  const count = await Resource.countDocuments({
    ...searchCriteria,
  });

  let resources = await Resource.find({
    ...searchCriteria,
  })
    .sort(sortCriteria)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (filter === "highest") {
    resources = resources.sort((a, b) => b.averageRating - a.averageRating);
  } else if (filter === "lowest") {
    resources = resources.sort((a, b) => a.averageRating - b.averageRating);
  }

  res.status(200).json({ resources, page, pages: Math.ceil(count / pageSize) });
});

// @desc Create resource collection
// @route POST /api/resources
// @access Private
const createResource = asyncHandler(async (req, res) => {
  const { title, description, languages, links, notes } = req.body;

  try {
    validateResourceFields(title, description, languages, links);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

  const isAdmin = req.user.isAdmin;
  const resource = new Resource({
    user: req.user._id,
    authorName: req.user.name,
    title,
    description,
    languages,
    links,
    notes,
    isOfficial: isAdmin ? true : false,
  });

  const createdResource = await resource.save();

  req.user.createdResources.push(createdResource._id);
  await req.user.save();

  res.status(201).json(createdResource);
});

// @desc Get resource by resource ID
// @route PUT /api/resources/details/:id
// @access Public
const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    if (resource.user.toString() !== req.user._id.toString()) {
      resource.totalViews += 1;
      resource.monthlyViews += 1;
      await resource.save();
    }

    res.status(200).json(resource);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Update an existing resource
// @route PUT /api/resources/:id/modify
// @access Private
const updateResource = asyncHandler(async (req, res) => {
  const { title, description, languages, links, notes } = req.body;

  const resource = await Resource.findById(req.params.id);

  if (resource) {
    if (resource.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this resource");
    }

    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.languages = languages || resource.languages;
    resource.links = links || resource.links;
    resource.notes = notes || resource.notes;

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Delete a resource
// @route DELETE /api/resources/:id/modify
// @access Private
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    if (resource.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this resource");
    }
    await Resource.deleteOne({ _id: req.params.id });
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { createdResources: req.params.id } }
    );
    res.json({ message: "Resource removed" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Add a rating / comment to a resource
// @route POST /api/resources/:id/rating
// @access Private
const addResourceRating = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    throw new Error("Both rating and comment need to be provided");
  }

  if (rating > 5 || rating < 0) {
    throw new Error("Rating needs to be between 0 and 5");
  }

  const resource = await Resource.findById(req.params.id);

  if (resource) {
    if (resource.user.toString() === req.user._id.toString()) {
      res.status(403);
      throw new Error("You cannot rate or comment on your own collection");
    }

    const alreadyRated = resource.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyRated) {
      res.status(400);
      throw new Error("You've already rated this collection");
    }

    const ratingObject = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };
    resource.ratings.push(ratingObject);

    resource.averageRating = calculateAverageRating(resource.ratings);
    resource.ratingBreakdown = calculateRatingBreakdown(resource.ratings);

    await resource.save();
    res.status(201).json({ message: "Rating added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Get resources by tag
// @route GET /api/resources/:tag
// @access Private
const getResourcesByTag = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const tagId = req.params.tag;

  const count = await Resource.countDocuments({ tags: { $in: [tagId] } });
  const resources = await Resource.find({ tags: { $in: [tagId] } })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ resources, page, pages: Math.ceil(count / pageSize) });
});

// @desc Get user review of a resource
// @route GET /api/resources/:id/get-review
// @access Private
const getUserReview = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const userReview = resource.ratings.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (userReview) {
    res.status(200).json(userReview);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

// @desc Get latest comments of a resource
// @route GET /api/resources/:id/latest-comments
// @access Private
const getLatestComments = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const latestComments = resource.ratings
    .filter((rating) => rating.comment)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);

  res.status(200).json(latestComments);
});

// @desc Get total views of a resource
// @route GET /api/resources/:id/total-views
// @access Private
const getTotalViewsById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (resource) {
    if (resource.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to see the total views of this resource");
    }

    res.status(200).json({ totalViews: resource.totalViews });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Get toop 6 viewed resources of the month
// @route GET /api/resources/top/monthly
// @access Private
const getTopMonthlyViewedResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find().sort({ monthlyViews: -1 }).limit(6);

  res.status(200).json(resources);
});

export {
  getResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
  addResourceRating,
  getResourcesByTag,
  getUserReview,
  getLatestComments,
  getTotalViewsById,
  getTopMonthlyViewedResources,
};
