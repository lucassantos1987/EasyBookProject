const ProviderService = require('../service/ProviderService');

async function getProvider(request, response) {
    ProviderService.getProvider(request, response);
}

async function saveProvider(request, response) {
    ProviderService.saveProvider(request, response);
}

async function updateProvider(request, response) {
    ProviderService.updateProvider(request, response);
}

async function updateProviderPhoto(request, response) {
    ProviderService.updateProviderPhoto(request, response);
}

module.exports = { getProvider, saveProvider, updateProvider, updateProviderPhoto }