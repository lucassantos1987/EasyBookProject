const express = require ('express');

const CategoryController = require('./controller/CategoryController');
const CustomerController = require('./controller/CustomerController');
const CustomerUserController = require('./controller/CustomerUserController');
const ProviderController = require('./controller/ProviderController');
const ProviderUserController = require('./controller/ProviderUserController');
const ProviderCategoryController = require('./controller/ProviderCategoryController');
const SendEmailController = require('./controller/SendEmailController');
const UtilsController = require('./controller/UtilsController');

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
routes.post('/provider_user', ProviderUserController.saveProviderUser);
routes.get('/provider_user', ProviderUserController.signIn);

routes.post('/send_email_confirmation', SendEmailController.sendEmailConfirmation);
routes.post('/upload_photo_profile', UtilsController.uploadPhotoProfile);

module.exports = routes;