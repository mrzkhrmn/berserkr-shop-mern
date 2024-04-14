import Category from "../models/categoryModel.js";
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

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Error in getAllProducts" + error });
    console.log(error);
  }
};

export const getJewelryProducts = async (req, res) => {
  try {
    const category = await Category.find({ name: "Taki" });
    if (!category) res.status(404).json({ error: "Category not found!" });
    const jewelryProducts = await Product.find({ category });

    res.status(200).json(jewelryProducts);
  } catch (error) {
    res.status(500).json({ error: "Error in getJewelryProducts" + error });
    console.log(error);
  }
};

export const getWearProducts = async (req, res) => {
  try {
    const category = await Category.find({ name: "Giyim" });
    if (!category) res.status(404).json({ error: "Category not found!" });
    const wearProducts = await Product.find({ category });

    res.status(200).json(wearProducts);
  } catch (error) {
    res.status(500).json({ error: "Error in getWearProducts" + error });
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  const { brand, name, category, size, count, price, description } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: "Product not found!" });

    product.brand = brand || product.brand;
    product.name = name || product.name;
    product.category = category || product.category;
    product.size = size || product.size;
    product.count = count || product.count;
    product.price = price || product.price;
    product.description = description || product.description;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error in updateProduct" + error });
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: "Product not found!" });

    await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted");
  } catch (error) {
    res.status(500).json({ error: "Error in deleteProduct" + error });
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: "Product not found!" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error in getProductById" + error });
    console.log(error);
  }
};
