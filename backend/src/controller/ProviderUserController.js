const ProviderUSerService = require('../service/ProviderUserService');

async function saveProviderUser(request, response) {
    ProviderUSerService.saveProviderUser(request, response);
}

async function signIn(request, response) {
    ProviderUSerService.signIn(request, response);
}

module.exports = { saveProviderUser, signIn }