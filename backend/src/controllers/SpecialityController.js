const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const id_category = request.query.id_category;

        console.log("Teste" + id_category);

        const category = await connection('speciality')
        .orderBy('name', 'asc')
        .select('*')
        .modify(function(queryBuilder) {
            if (id_category) {
                queryBuilder.where('id_category', '=', id_category);
            }
        })
    
        return response.json(category);
    },
    
    async categorySpecilaity(request, response) {

        const filterCategory = request.query.id_category;
        const filterName = request.query.name;

        console.log(filterCategory + " " + filterName);

        const data = await connection('speciality')
        .orderBy('category.name', 'asc')
        .join('category', 'category.id', 'speciality.id_category')
        .select('category.name as category', 'speciality.name as speciality')
        .modify(function(queryBuilder) {

            const name = "%" + filterName + "%";

            if (filterCategory && filterName) {
                queryBuilder.where('speciality.id_category', '=', filterCategory)
                .andWhere('speciality.name', 'like', name);
            } else if (filterCategory && !filterName) {
                queryBuilder.where('speciality.id_category', '=', filterCategory);
            } else if (!filterCategory && filterName) {
                queryBuilder.where('speciality.name', 'like', name);
            }
        });
        
        return response.json(data);
    },

    async create(request, response) {
        const { id_category, name } = request.body;

        const result = await connection('speciality').insert({
            id_category,
            name,
        });

        const id = result[0];
        return response.json({ result });
    }
}