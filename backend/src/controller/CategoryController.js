const CategoryService = require('../service/CategoryService');

async function getCategory(request, response) {
    CategoryService.getCategory(request, response);
}

async function saveCategory(request, response) {
    CategoryService.saveCategory(request, response);
}

async function checkCategory(request, response) {
    CategoryService.checkCategory(request, response);
}


module.exports = { getCategory, saveCategory, checkCategory }