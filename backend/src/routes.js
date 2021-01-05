const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const SpecialityController = require('./controllers/SpecialityController');
const ProviderController = require('./controllers/ProviderController');
const ProviderUserController = require('./controllers/ProviderUserController');
const ProviderCategorySpecialityController = require('./controllers/ProviderCategorySpecialityController');
const CustomerController = require('./controllers/CustomerController');
const CustomerUserController = require('./controllers/CustomerUserController');
const { updateData } = require('./controllers/ProviderController');
const routes = express.Router();

routes.get('/category', CategoryController.index);
routes.get('/if_category_exists', CategoryController.ifCategoryExists);
routes.post('/category', CategoryController.create);

routes.get('/speciality', SpecialityController.index);
routes.get('/speciality_category', SpecialityController.categorySpecilaity);
routes.post('/speciality', SpecialityController.create);

routes.get('/provider', ProviderController.index);
routes.post('/provider', ProviderController.create);
routes.post('/provider_update', ProviderController.updateData);
routes.post('/provider_update_photo', ProviderController.updatePhoto);
routes.post('/provider_user', ProviderUserController.create);
routes.get('/provider_user', ProviderUserController.signin);
routes.get('/provider_category_speciality', ProviderCategorySpecialityController.listCatgorySpecialityProvider);
routes.post('/provider_category_speciality', ProviderCategorySpecialityController.create);
routes.post('/provider_category_speciality', ProviderCategorySpecialityController.create);
routes.get('/provider_category_speciality', ProviderCategorySpecialityController.index);

routes.get('/customer', CustomerController.index);
routes.post('/customer', CustomerController.create);
routes.post('/customer_update', CustomerController.updateData);
routes.post('/customer_update_photo', CustomerController.updatePhoto);
routes.get('/customer_user', CustomerUserController.signin);

module.exports = routes;