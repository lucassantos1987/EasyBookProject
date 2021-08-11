const CategoryDAO = require('../dao/CategoryDAO');

async function getCategory(request, response) {
    CategoryDAO.getCategory(request, response);
}

async function saveCategory(request, response) {
    CategoryDAO.saveCategory(request, response);
}

module.exports = { getCategory, saveCategory }