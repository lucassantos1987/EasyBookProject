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
            latitude,
            longitude
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
            photo,
            latitude,
            longitude
        })
        .returning('id');

        return response.json({result});
    }
}