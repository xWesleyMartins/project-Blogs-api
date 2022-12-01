const postService = require('../services/blogPost.service');
const postValidation = require('../validations/postValidation');
const { BlogPost } = require('../models');

const createBlogPost = async (req, res) => {
 const { title, content, categoryIds } = req.body;
  const { error } = postValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
try {
  const teste = await postService.getByCategoryId(categoryIds);
    if (teste.some((qualquer) => qualquer)) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' }); 
    }
    const { id } = req.user.data;
  const result = await postService.createBlogPost(title, content, categoryIds, id);
  return res.status(201).json(result);
} catch (err) {
  res.status(500).json({ message: err });
}
};

const getAllPosts = async (_req, res) => {
  const result = await postService.getAllPosts();
  res.status(200).json(result);
};

const getByid = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getByid(+id);
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const existPost = await postService.getByid(+id);
  const getId = await BlogPost.findOne({
    where: { id },
   
  });
  if (!getId) return res.status(404).json({ message: 'Post does not exist' });
  if (req.user.data.id !== existPost.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  await postService.deleteById(+id);
  res.status(204).end();
};
// const updatPost = async () => {
//   const { id } = req.params;
//   const existPost = await postService.getByid(+id);
//   const getId = await BlogPost.findOne({
//     where: { id },
   
//   });
//   if (!getId) return res.status(404).json({ message: 'Post does not exist' });
//   if (req.user.data.id !== existPost.dataValues.userId) {
//     return res.status(401).json({ message: 'Unauthorized user' });
//   }
// }
module.exports = { createBlogPost, getAllPosts, getByid, deleteById };