const { restart } = require('nodemon');
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
    },

    async signin(request, response) {
        const email = request.query.email;
        const password = request.query.password;

        const result = await connection('provider_user')
            .select('id_provider',
                'email',
                'password'
            )
            .where('email', '=', email)
            .andWhere('password', '=', password);

        return response.json(result);
    }
}