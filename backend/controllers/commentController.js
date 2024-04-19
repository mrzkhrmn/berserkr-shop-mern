import Comment from "../models/commentModel.js";
import Product from "../models/productModel.js";

export const createComment = async (req, res) => {
  try {
    const { text, userId, productId } = req.body;
    const newComment = new Comment({
      text,
      userId,
      productId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error in createComment" + error });
    console.log(error);
  }
};

export const getProductComments = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: "Product not found!" });

    const comments = await Comment.find({ productId: product._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error in getProductComments" + error });
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.userId === req.user.id) {
      await Comment.findByIdAndDelete(comment._id);
      res.status(200).json({ message: "Comment Deleted" });
    } else {
      res.status(400).json({ error: "You can only delete your own comment!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in deleteComment" + error });
    console.log(error);
  }
};
