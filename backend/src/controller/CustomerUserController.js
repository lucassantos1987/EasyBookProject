const CustomerUserService = require('../service/CustomerUserService');

function signIn(request, response) {
    CustomerUserService.signIn(request, response);
}

function logout(request, response) {
    CustomerUserService.logout(request, response);
}

function verifyJWT(request, response, next) {
    CustomerUserService.verifyJWT(request, response, next);
}

module.exports = { signIn, logout, verifyJWT }
