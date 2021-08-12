const ProviderCategoryService = require('../service/ProviderCategoryService');

async function getProviderCategory(request, response) {
    ProviderCategoryService.getProviderCategory(request, response);
}

module.exports = { getProviderCategory }