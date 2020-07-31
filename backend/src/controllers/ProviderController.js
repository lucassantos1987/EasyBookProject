const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const {
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
            username,
            password
        } = request.body;

        const result = await connection('provider').insert({
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
            photo
        })
        .returning('id');

        const id_provider = result[0];

        console.log(id_provider);

        await connection('provider_user').insert({
            id_provider,
            username,
            password
        });

        return response.json({result});
    }
}