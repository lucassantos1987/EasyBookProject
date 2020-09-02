const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {
            id_provider,
            id_category,
            id_speciality
        } = request.body;

        const result = await connection('provider_category_speciality').insert({
            id_provider,
            id_category,
            id_speciality
        });

        return response.json({ result });
    }
}