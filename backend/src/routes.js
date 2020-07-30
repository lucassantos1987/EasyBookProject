const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const SpecialityController = require('./controllers/SpecialityController');
const ProviderController = require('./controllers/ProviderController');
const routes = express.Router();

routes.get('/category', CategoryController.index);
routes.get('/if_category_exists', CategoryController.ifCategoryExists);
routes.post('/category', CategoryController.create);

routes.get('/speciality', SpecialityController.index);
routes.get('/speciality_category', SpecialityController.categorySpecilaity);
routes.post('/speciality', SpecialityController.create);

routes.post('/provider', ProviderController.create)

module.exports = routes;