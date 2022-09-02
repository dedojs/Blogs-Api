const CategoryService = require('../services/CategorieService');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await CategoryService.createCategory(name);
    if (category.message) {
      return res.status(category.code).json({ message: category.message });
    }
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const getCategory = async (_req, res, next) => {
  try {
    const category = await CategoryService.getCategory();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getCategory,
};
