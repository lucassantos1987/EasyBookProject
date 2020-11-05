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
            email,
            password
        } = request.body;

        /* upload da imagem */
        let localUri = photo;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let typefile = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('name', 'avatar');
        formData.append('image', { 
            uri: localUri,             
            type: typefile,
            name: filename 
        });

        const uploadImage = await fetch('http://192.168.0.108:3333/upload', {
            method: 'POST',            
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => {
            console.log(response.text());
        }).catch(error => {
            console.log(error.message);
        });

        if (uploadImage) {

            

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
                email,
                password
            });
            
            return response.json({id_provider});
        }
    }
}