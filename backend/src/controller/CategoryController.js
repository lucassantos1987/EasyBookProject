const CategoryService = require('../service/CategoryService');

async function getCategoryProvider(request, response) {
    CategoryService.getCategoryProvider(request, response);
}

async function getCategory(request, response) {
    CategoryService.getCategory(request, response);
}

async function saveCategory(request, response) {
    CategoryService.saveCategory(request, response);
}

async function checkCategory(request, response) {
    CategoryService.checkCategory(request, response);
}


module.exports = { getCategoryProvider, getCategory, saveCategory, checkCategory }