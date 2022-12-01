const categoriesService = require('../services/categories.service');

const createCategory = async (req, res) => {
  const { name } = req.body; 
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const createResult = await categoriesService.createCategory(name);
  return res.status(201).json(createResult);
};

const getAllCategories = async (_req, res) => {
  const categoriesResult = await categoriesService.getAllCategories();
  return res.status(200).json(categoriesResult);
};
module.exports = { createCategory, getAllCategories };