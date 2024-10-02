import mongoose from "mongoose";

const ratingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    comment: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const resourceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    authorName: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    links: [
      {
        url: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    notes: {
      type: String,
      default: "",
    },
    ratings: [ratingSchema],
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingBreakdown: {
      type: Map,
      of: Number,
      default: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
    isOfficial: {
      type: Boolean,
      default: false,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResourceReport",
      },
    ],
    totalViews: {
      type: Number,
      default: 0,
    },
    monthlyViews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
