const ProviderCategoryDAO = require('../dao/ProviderCategoryDAO');

async function getProviderCategory(request, response) {
    ProviderCategoryDAO.getProviderCategory(request, response);
}

module.exports = { getProviderCategory }