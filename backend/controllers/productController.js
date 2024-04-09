import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({
      _id: newProduct._id,
      brand: newProduct.brand,
      name: newProduct.name,
      description: newProduct.description,
      imageUrls: newProduct.imageUrls,
      category: newProduct.category,
      count: newProduct.count,
      price: newProduct.price,
      size: newProduct.size,
    });
  } catch (error) {
    res.status(500).json({ error: "Error in createproduct" + error });
    console.log(error);
  }
};
