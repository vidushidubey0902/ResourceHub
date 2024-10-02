import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import Resource from "../models/resourceModel.js";
import generateToken from "../utils/generateToken.js";

// desc     auth user / get token
// route    POST /api/users/auth
// access   PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// desc     register new user
// route    POST /api/users
// access   PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// desc     logout user
// route    POST /api/users/logout
// access   PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// desc     get user profile
// route    GET /api/users/profile
// access   PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// desc     update user profile
// route    PUT /api/users/profile
// access   PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (req.body.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      res.status(400);
      throw new Error("E-mail is already taken");
    }
  }

  if (req.body.oldPassword) {
    const isMatch = await user.matchPassword(req.body.oldPassword);

    if (!isMatch) {
      res.status(400);
      throw new Error("Old password is incorrect");
    }

    if (req.body.newPassword) {
      user.password = req.body.newPassword;
    }
  } else if (req.body.newPassword) {
    res.status(400);
    throw new Error("Old password is required to update the password");
  }

  const oldName = user.name;
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.description = req.body.description || user.description;

  const updatedUser = await user.save();

  if (req.body.name && req.body.name !== oldName) {
    await Resource.updateMany(
      { user: req.user._id },
      { authorName: req.body.name }
    );
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

// @desc Add resources to favoriteResources
// @route POST /api/users/favorites/resources/:id
// @access Private
const addFavoriteResource = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const resource = await Resource.findById(req.params.id);
  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  if (resource.user.toString() === req.user._id.toString()) {
    res.status(403);
    throw new Error("You cannot favorite your own resource");
  }

  if (user.favoriteResources.includes(resource._id)) {
    res.status(400);
    throw new Error("Resource is already favorited");
  }

  user.favoriteResources.push(resource._id);
  resource.favoritesCount += 1;
  await user.save();
  await resource.save();

  res.status(200).json({ message: "Resource added to favorites" });
});

const getFavoriteResources = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "favoriteResources",
    select: "_id title description",
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const favoriteResources = user.favoriteResources.map((resource) => ({
    _id: resource._id,
    title: resource.title,
    description: resource.description,
  }));

  res.status(200).json(favoriteResources);
});

// @desc Remove resource from favoriteResources
// @route DELETE /api/users/favorites/:id
// @access Private
const removeFavoriteResource = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const resource = await Resource.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const resourceIndex = user.favoriteResources.indexOf(req.params.id);
  if (resourceIndex === -1) {
    res.status(400);
    throw new Error("Resource not in favorites");
  }

  user.favoriteResources.splice(resourceIndex, 1);
  resource.favoritesCount -= 1;
  await user.save();
  await resource.save();

  res.status(200).json({ message: "Resource removed from favorites" });
});

// @desc Remove all favorited resources
// @route PUT /api/users/favorites/resources
// @access Private
const removeAllFavoriteResources = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const favoriteResourcesIds = user.favoriteResources;

  await Resource.updateMany(
    { _id: { $in: favoriteResourcesIds } },
    { $inc: { favoritesCount: -1 } }
  );

  user.favoriteResources = [];
  await user.save();

  res.status(200).json({ message: "All favorites removed" });
});

// @desc Get all resources created by the user
// @route /api/users/created-resources
// @access Private
const getCreatedResources = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "createdResources",
    select: "_id",
  });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const createdResourceIds = user.createdResources.map(
    (createdResource) => createdResource._id
  );

  res.status(200).json(createdResourceIds);
});

// @desc Check if a resource has already been favorited
// @route /api/users/favorites/resources/check/:id
// @access Private
const checkIfResourceFavorited = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const resource = await Resource.findById(req.params.id);
  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const isFavorited = user.favoriteResources.includes(resource._id);
  res.status(200).json({ isFavorited });
});

const getUserContributions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("createdResources");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const contributions = user.createdResources.length;

  res.status(200).json({ totalContributions: contributions });
});

const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "createdResources createdRoadmaps"
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const totalContributions =
    user.createdResources.length + user.createdRoadmaps.length;

  let totalRatings = 0;
  let ratingCount = 0;

  user.createdResources.forEach((resource) => {
    totalRatings += resource.averageRating * resource.ratings.length;
    ratingCount += resource.ratings.length;
  });

  user.createdRoadmaps.forEach((roadmap) => {
    totalRatings += roadmap.averageRating * roadmap.ratings.length;
    ratingCount += roadmap.ratings.length;
  });

  const averageRating = ratingCount ? totalRatings / ratingCount : 0;

  user.averageRating = averageRating;
  await user.save();

  res.status(200).json({
    averageRating: user.averageRating,
    totalContributions,
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addFavoriteResource,
  removeFavoriteResource,
  getFavoriteResources,
  removeAllFavoriteResources,
  getCreatedResources,
  checkIfResourceFavorited,
  getUserContributions,
  getUserStats,
};
