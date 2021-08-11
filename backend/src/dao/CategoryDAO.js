const connection = require('../database/connection');

async function getCategory(request, response) {
    
    var filterName  = request.query.name;

    await connection('category')
    .orderBy('name', 'asc')
    .select('*')
    .modify(function(queryBuilder) {
        if (filterName) {
            const filter = "%"+filterName+"%";
            queryBuilder.where('name', 'like', filter);
        }
    });

    return response.json(category);
}

async function saveCategory(request, response) {
    
    const { name } = request.body;
    await connection('category').insert({
        name
    });

    return response.json({ result });
}

module.exports = { getCategory, saveCategory }