const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};
const getAllCategories = async () => {
  const categoriesResult = await Category.findAll();
  return categoriesResult;
};
module.exports = { createCategory, getAllCategories };