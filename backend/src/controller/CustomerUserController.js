const CustomerUserService = require('../service/CustomerUserService');

async function signIn(request, response) {
    CustomerUserService.signIn(request, response);
}

module.exports = { signIn }
