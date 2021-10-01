const connection = require('../database/connection');

async function getProvider(request, response) {
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
            'whatsapp',
            'obs'
        )
        .modify(function (queryBuilder) {
            queryBuilder.where('id', '=', id_provider);
        })

    return response.json(result);
}

async function saveProvider(request, response) {
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
        email_address,
        password,
        id_category
    } = request.body;

    const trx = await connection.transaction();

    await trx('provider').insert({
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
        photo: photo,
        last_name,
        latitude,
        longitude
    })
    .returning('id')
    .then(id => {

        const id_provider = id[0];

        trx('provider_user').insert({
            id_provider,
            password,
            email: email_address
        })
        .then(function() {

        })
        .catch(function (error) {
            return response.json({ message: error.message });
        });

        trx('provider_category').insert({
            id_provider,
            id_category
        })
        .then(function() {
            return response.json({ message: "Cadastro realizado com sucesso." });
        })
        .catch(function(err) {
            return response.json({ message: error.message });    
        })
    })
    .catch(function (error) {
        console.log(error.message);
        return response.json({ message: error.message });
    });

    trx.commit();
}

async function updateProvider(request, response) {
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
        longitude,
        obs
    } = request.body;

    await connection('provider')
        .where({ id: id })
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
            longitude: longitude,
            obs: obs
        })
        .then(u => response.status(!!u ? 200 : 404).json({ success: !!u }))
        .catch(e => response.status(500).json(e));
}

async function updateProviderPhoto(request, response) {
    const {
        id,
        photo
    } = request.body;

    await connection('provider')
        .where({ id: id })
        .update({
            photo: photo
        })
        .then(u => response.status(!!u ? 200 : 404).json({ success: !!u }))
        .catch(e => response.status(500).json(e));
}

module.exports = { getProvider, saveProvider, updateProvider, updateProviderPhoto }