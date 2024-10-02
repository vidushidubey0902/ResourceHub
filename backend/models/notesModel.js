import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#444444",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", notesSchema);

export default Note;
