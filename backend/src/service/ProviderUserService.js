const ProviderUSerDAO = require('../dao/ProviderUserDAO');

async function saveProviderUser(request, response) {
    ProviderUSerDAO.saveProviderUser(request, response);
}

async function signIn(request, response) {
    ProviderUSerDAO.signIn(request, response);
}

module.exports = { saveProviderUser, signIn }