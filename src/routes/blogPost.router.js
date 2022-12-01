const { Router } = require('express');
const blogPostController = require('../controllers/blogPost.controller');
const validaToken = require('../middlewares/auth.middleware');

const blogPostRouter = Router();

blogPostRouter.post('/', validaToken, blogPostController.createBlogPost);
blogPostRouter.get('/:id', validaToken, blogPostController.getByid);
blogPostRouter.get('/', validaToken, blogPostController.getAllPosts);
blogPostRouter.delete('/:id', validaToken, blogPostController.deleteById);
// blogPostRouter.put('/:id', validaToken, blogPostController.putById);

module.exports = blogPostRouter;