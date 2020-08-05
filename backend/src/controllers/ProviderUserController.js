const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {
            id_provider,
            username,
            password
        } = request.body;

        const result = await connection('provider_user').insert({
            id_provider,
            username,
            password
        });

        return response.json({ result });
    }
}