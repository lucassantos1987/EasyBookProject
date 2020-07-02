const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const category = await connection('category').select('*');
    
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