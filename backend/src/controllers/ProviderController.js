const Knex = require('knex');
const connection = require('../database/connection');
const fetch = require('node-fetch');

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
            email,
            password
        } = request.body;

        const trx = await connection.transaction();

        const result = await trx('provider').insert({
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

        const id_provider = result[0];

        await trx('provider_category_speciality').insert({            
            id_provider,
            id_category,            
            id_speciality
        });

        await trx('provider_user').insert({
            id_provider,            
            username,
            email,
            password
        });

        trx.commit();
            
        return response.json({result});
    },

    async indexPhoto(request, response) {
        const photo = "upload/1605320826069.jpg";
        
        const result = await fetch('http://192.168.0.108:3333/' + photo, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',                
            },
        });
        
        console.log(result);

        return result;
    }

}