const Knex = require('knex');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {
            name,
            last_name,
            address,
            number,
            complement,
            district,
            city,
            state,
            zip_code,            
            whatsapp,
            obs,
            photo,
            latitude,
            longitude,
            id_category,
            id_speciality,
            username,
            password
        } = request.body;

        const trx = await connection.transaction();

        const id_provider = await trx('provider').insert({
            name,
            last_name,
            address,
            number,
            complement,
            district,
            city,
            state,
            zip_code,            
            whatsapp,
            obs,
            photo,
            latitude,
            longitude
        })
        .returning('id');

        await trx('provider_category_speciality').insert({
            id_provider,
            id_category,
            id_speciality
        });

        await connection('provider_user').insert({
            id_provider,
            username,
            password
        });
        
        return response.json({id_provider});
    }
}