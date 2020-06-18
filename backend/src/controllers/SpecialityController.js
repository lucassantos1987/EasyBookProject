const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const category = await connection('speciality').select('*');
    
        return response.json(category);
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