const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const SpecialityController = require('./controllers/SpecialityController');
const routes = express.Router();

routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.create);

routes.get('/speciality', SpecialityController.index);
routes.get('/speciality_category', SpecialityController.categorySpecilaity);
routes.post('/speciality', SpecialityController.create);

module.exports = routes;