const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const SpecialityController = require('./controllers/SpecialityController');
const { ifCategoryExists } = require('./controllers/CategoryController');
const routes = express.Router();

routes.get('/category', CategoryController.index);
routes.get('/if_category_exists', CategoryController.ifCategoryExists);
routes.post('/category', CategoryController.create);

routes.get('/speciality', SpecialityController.index);
routes.get('/speciality_category', SpecialityController.categorySpecilaity);
routes.post('/speciality', SpecialityController.create);

module.exports = routes;