const { Category } = require('../database/models');
const { validateCategory } = require('../utils');

const createCategory = async (name) => {
  const verify = validateCategory(name);
  if (verify.message) return verify;
  const category = await Category.create({ name });
  
  return category;
};

const getCategory = async () => {
  const category = await Category.findAll();
  return category;
};

module.exports = {
  createCategory,
  getCategory,
};