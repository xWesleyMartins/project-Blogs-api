const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validaToken = require('../middlewares/auth.middleware');

const routerUser = Router();

routerUser.post('/', userController.createUserController);
routerUser.get('/', validaToken, userController.getAllUser);
routerUser.get('/:id', validaToken, userController.getUserById);

module.exports = routerUser;