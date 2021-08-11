const CustomerUserDAO = require ('../dao/CustomerUserDAO');

async function signIn(request, response) {
    CustomerUserDAO.signIn(request, response);
}

module.exports = { signIn }