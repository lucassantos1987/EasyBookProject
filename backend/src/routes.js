const express = require ('express');
const routes = express.Router();

const cors = require('cors'); 
routes.use(cors());
routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin : http://localhost:3000");
    res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Credentials : true")
    res.header("Access-Control-Allow-Headers : Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const CategoryController = require('./controller/CategoryController');
const CustomerController = require('./controller/CustomerController');
const CustomerUserController = require('./controller/CustomerUserController');
const ProviderController = require('./controller/ProviderController');
const ProviderUserController = require('./controller/ProviderUserController');
const ProviderCategoryController = require('./controller/ProviderCategoryController');
const SendEmailController = require('./controller/SendEmailController');
const RatingPRoviderController = require('./controller/RatingProviderController');

routes.get('/category_provider', CategoryController.getCategoryProvider);
routes.get('/category', CategoryController.getCategory);
routes.post('/category', CategoryController.saveCategory);
routes.get('/check_category', CategoryController.checkCategory);

routes.get('/customer', CustomerUserController.verifyJWT, CustomerController.getCustomer);
routes.post('/customer', CustomerController.saveCustomer);
routes.post('/customer_update', CustomerUserController.verifyJWT, CustomerController.updateCustomer);
routes.post('/customer_update_photo', CustomerUserController.verifyJWT, CustomerController.updateCustomerPhoto);
routes.get('/customer_user_sigin', CustomerUserController.signIn);
routes.post('/customer_user_logout', CustomerUserController.logout);

routes.get('/provider_category', ProviderCategoryController.getProviderCategory);
routes.get('/provider', ProviderController.getProvider);
routes.post('/provider', ProviderController.saveProvider);
routes.post('/provider_update', ProviderController.updateProvider);
routes.post('/provider_update_photo', ProviderController.updateProviderPhoto);
routes.post('/provider_user', ProviderUserController.saveProviderUser);
routes.get('/provider_user', ProviderUserController.signIn);

routes.post('/send_email_confirmation', SendEmailController.sendEmailConfirmation);

routes.get('/rating_provider', RatingPRoviderController.getRatings);
routes.post('/rating_provider', RatingPRoviderController.saveRating)

module.exports = routes;