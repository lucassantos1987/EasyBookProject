const ProviderDAO = require('../dao/ProviderDAO');

async function getProvider(request, response) {
    ProviderDAO.getProvider(request, response);
}

async function saveProvider(request, response) {
    ProviderDAO.saveProvider(request, response);
}

async function updateProvider(request, response) {
    ProviderDAO.updateProvider(request, response);
}

async function updateProviderPhoto(request, response) {
    ProviderDAO.updateProviderPhoto(request, response);
}

module.exports = { getProvider, saveProvider, updateProvider, updateProviderPhoto }