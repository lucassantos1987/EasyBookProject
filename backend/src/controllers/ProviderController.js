const Knex = require('knex');
const connection = require('../database/connection');
const fetch = require('node-fetch');

module.exports = {   
    
    async index(request, response) {
        const id_provider = request.query.id_provider;

        const result = await connection('provider')
        .select('name', 
                'last_name', 
                'address',
                'number',
                'district',
                'city',
                'state',
                'zip_code',
                'photo',
                'prefix_whatsapp',
                'whatsapp'
        )
        .modify(function(queryBuilder) {
            queryBuilder.where('id', '=', id_provider);
        })

        return response.json(result);
    }, 

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
            email,
            password
        } = request.body;

        const trx = await connection.transaction();

        const result = await trx('provider').insert({
            name,            
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
            last_name,
            latitude,
            longitude
        })
        .returning('id');

        const id_provider = result[0];

        await trx('provider_category_speciality').insert({            
            id_provider,
            id_category,            
            id_speciality
        });

        await trx('provider_user').insert({
            id_provider,            
            password,
            email
        });

        trx.commit();
            
        return response.json({result});
    },

    async updateData(request, response) {
        const {
            id,
            name,
            last_name,
            address,
            number,
            district,
            city,
            state,
            zip_code,            
            whatsapp,
            latitude,
            longitude
        } = request.body;

        await connection('provider')
        .where({ id: id})
        .update({ 
            name: name,
            last_name: last_name,
            address: address,
            number: number,
            district: district,
            city: city,
            state: state,
            zip_code: zip_code,
            whatsapp: whatsapp,
            latitude: latitude,
            longitude: longitude
        })
        .then(u => response.status( !!u ? 200:404 ).json( {success:!!u} ))
        .catch(e => response.status(500).json(e));
    },

    async updatePhoto(request, response) {
        const {
            id,
            photo
        } = request.body;

        await connection('provider')
        .where({ id: id})
        .update({
            photo: photo
        })
        .then(u => response.status( !!u ? 200:404 ).json( {success:!!u} ))
        .catch(e => response.status(500).json(e));
    }
}