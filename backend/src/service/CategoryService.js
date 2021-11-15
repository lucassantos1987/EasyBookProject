const CategoryDAO = require('../dao/CategoryDAO');

async function getCategoryProvider(request, response) {
    CategoryDAO.getCategoryProvider(request, response);
}

async function getCategory(request, response) {
    CategoryDAO.getCategory(request, response);
}

async function saveCategory(request, response) {
    CategoryDAO.saveCategory(request, response);
}

async function checkCategory(request, response) {
    CategoryDAO.checkCategory(request, response);
}

module.exports = { getCategoryProvider, getCategory, saveCategory, checkCategory }