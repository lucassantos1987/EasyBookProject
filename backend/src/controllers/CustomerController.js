const Knex = require('knex');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {
            first_name,
            last_name,
            whatsapp,
            photo,
            email,
            password
        } = request.body;

        const trx = await connection.transaction();

        const result = await trx('customer').insert({
            first_name,
            last_name,
            whatsapp,
            photo
        })
        .returning('id');

        const id_customer = result[0];

        await trx('customer_user').insert({
            id_customer,
            email,
            password
        });

        trx.commit();
            
        return response.json({result});
    },

}