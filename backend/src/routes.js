const express = require('express');
const CategoryController = require('./controller/CategoryController');
const CustomerController = require('./controller/CustomerController');
const CustomerUserController = require('./controller/CustomerUserController');

const SpecialityController = require('./controllers/SpecialityController');
const ProviderController = require('./controllers/ProviderController');
const ProviderUserController = require('./controllers/ProviderUserController');
const ProviderCategorySpecialityController = require('./controllers/ProviderCategorySpecialityController');


const ProviderCategoryController = require('./controllers/ProviderCategoryController');
const { updateData } = require('./controllers/ProviderController');
const routes = express.Router();

routes.get('/category', CategoryController.getCategory);
routes.post('/category', CategoryController.saveCategory);
routes.get('/check_category', CategoryController.checkCategory);

routes.get('/customer', CustomerController.getCustomer);
routes.post('/customer', CustomerController.saveCustomer);
routes.post('/customer_update', CustomerController.updateCustomer);
routes.post('/customer_update_photo', CustomerController.updateCustomerPhoto);
routes.get('/customer_user', CustomerUserController.signIn);


//routes.get('/category', CategoryController.index);
//routes.get('/if_category_exists', CategoryController.ifCategoryExists);
//routes.post('/category', CategoryController.create);

routes.get('/speciality', SpecialityController.index);
routes.get('/speciality_category', SpecialityController.categorySpecilaity);
routes.post('/speciality', SpecialityController.create);

routes.get('/provider', ProviderController.index);
routes.post('/provider', ProviderController.create);
routes.post('/provider_update', ProviderController.updateData);
routes.post('/provider_update_photo', ProviderController.updatePhoto);
routes.post('/provider_user', ProviderUserController.create);
routes.get('/provider_user', ProviderUserController.signin);
routes.get('/provider_category_speciality_list', ProviderCategorySpecialityController.listCatgorySpecialityProvider);
routes.post('/provider_category_speciality', ProviderCategorySpecialityController.create);
routes.get('/provider_category_speciality', ProviderCategorySpecialityController.index);

routes.get('/provider_category', ProviderCategoryController.listProviderCategory);


module.exports = routes;