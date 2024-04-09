import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(401).json({ error: "Category already exists!" });
    }

    const newCategory = new Category({ name });

    await newCategory.save();

    res.status(201).json({ name: newCategory.name });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in createCategory " + error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in getAllCategories " + error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({ error: "Category not found!" });

    await Category.findByIdAndDelete(category._id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in deleteCategory " + error });
  }
};
