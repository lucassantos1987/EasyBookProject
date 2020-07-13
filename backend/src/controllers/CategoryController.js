const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const  filterName  = request.query.name;

        const category = await connection('category')
        .orderBy('name', 'asc')
        .select('*')
        .modify(function(queryBuilder) {
            if (filterName) {

                const filter = "%"+filterName+"%";

                queryBuilder.where('name', 'like', filter);
            }
        });

        return response.json(category);
    },

    async ifCategoryExists(request, response) {

        const name = request.query.name;
        const category = await connection('category')
        .select('count(*) as quantidade')
        .where('name', '=', name);
        
        return response.json(category);        
    },

    async create(request, response) {
        const { name } = request.body;

        const result = await connection('category').insert({
            name,
        });
    
        return response.json({ result });
    }
}