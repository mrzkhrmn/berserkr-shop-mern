import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    size: { type: String, required: true },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
