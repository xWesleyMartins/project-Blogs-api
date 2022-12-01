const { Router } = require('express');
const categorieController = require('../controllers/categorie.controller');
const validaToken = require('../middlewares/auth.middleware');

const routerCategorie = Router();

routerCategorie.post('/', validaToken, categorieController.createCategory);
routerCategorie.get('/', validaToken, categorieController.getAllCategories);

module.exports = routerCategorie;