const { Router } = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const routerCategorie = require('./categories.router');
const blogPostRouter = require('./blogPost.router');

const router = Router();

router.use('/login', authRouter);
router.use('/user', userRouter);
router.use('/categories', routerCategorie);
router.use('/post', blogPostRouter);

module.exports = router; 