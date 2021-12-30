const CustomerUserService = require('../service/CustomerUserService');

function signIn(request, response) {
    CustomerUserService.signIn(request, response);
}

function verifyJWT(request, response, next) {
    CustomerUserService.verifyJWT(request, response, next);
}

module.exports = { signIn, verifyJWT }
