const express = require('express');
const CategoryController = require('./controller/CategoryController');
const CustomerController = require('./controller/CustomerController');
const CustomerUserController = require('./controller/CustomerUserController');

const ProviderController = require('./controller/ProviderController');
const ProviderUserController = require('./controllers/ProviderUserController');

const ProviderCategoryController = require('./controller/ProviderCategoryController');

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
routes.get('/provider_category', ProviderCategoryController.getProviderCategory);
routes.get('/provider', ProviderController.getProvider);
routes.post('/provider', ProviderController.saveProvider);
routes.post('/provider_update', ProviderController.updateProvider);
routes.post('/provider_update_photo', ProviderController.updateProviderPhoto);


routes.post('/provider_user', ProviderUserController.create);
routes.get('/provider_user', ProviderUserController.signin);
routes.get('/provider_category_speciality_list', ProviderCategorySpecialityController.listCatgorySpecialityProvider);
routes.post('/provider_category_speciality', ProviderCategorySpecialityController.create);
routes.get('/provider_category_speciality', ProviderCategorySpecialityController.index);




module.exports = routes;