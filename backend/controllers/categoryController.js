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
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error in getAllCategories " + error });
  }
};
