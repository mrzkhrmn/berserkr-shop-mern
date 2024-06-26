import mongoose from "mongoose";

const commentShcema = mongoose.Schema(
  {
    text: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: String, required: true },
    likes: { type: Array, default: [] },
    numberOfLikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentShcema);

export default Comment;
