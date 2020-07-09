const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const category = await connection('speciality').select('*');
    
        return response.json(category);
    },

    async categorySpecilaity(request, response) {
        const data = await connection('speciality')
        .orderBy('category.name', 'asc')
        .join('category', 'category.id', 'speciality.id_category')
        .select('category.name as category', 'speciality.name as speciality');
        
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