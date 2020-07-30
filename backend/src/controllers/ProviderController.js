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
            email,
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
            email,
            whatsapp,
            obs,
            photo
        }).returning('id');
 
        console.log(result);

        var id_provider = parseInt(result);
        
        const result2 = await connection('provider_user').insert({
            id_provider,
            username,
            password
        });

        return response.json({result2});
    }
}