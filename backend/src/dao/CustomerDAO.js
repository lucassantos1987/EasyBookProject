const connection = require('../database/connection');

async function getCustomer(request, response) {
    const id_customer = request.query.id_customer;

    const result = await connection('customer')
    .select('first_name', 
            'last_name', 
            'photo',
            'prefix_whatsapp',
            'whatsapp'
    )
    .modify(function(queryBuilder) {
        queryBuilder.where('id', '=', id_customer);
    })

    return response.json(result);
}

async function saveCustomer(request, response) {
    
    const { first_name, last_name, whatsapp, email_address, password, photo } = request.body;

    const trx = await connection.transaction();

    await trx('customer').insert({
        first_name: first_name,
        last_name: last_name,
        whatsapp: whatsapp,
        photo: photo
    })
    .returning('id')
    .then(id => {
        const id_customer = id[0];

        trx('customer_user').insert({
            id_customer,
            email: email_address,
            password: password
        })
        .then(function() {
            return response.json({ message: "Cadastro realizado com sucesso." });
        })
        .catch(function(error) {
            console.log(error.message);
            
            return response.json({ message: error.message });
        });        
    })
    .catch(function(error) {
        return response.json({ message: error.message });
    });

    trx.commit();
}

async function updateCustomer(request, response) {
    const { id, first_name, last_name, whatsapp } = request.body;

    await connection('customer')
    .where({ id: id})
    .update({ 
        first_name: first_name,
        last_name: last_name,
        whatsapp: whatsapp
    })
    .then(u => response.status( !!u ? 200:404 ).json( {success:!!u} ))
    .catch(e => response.status(500).json(e));
}

async function updateCustomerPhoto(request, response) {
    const { id, photo } = request.body;

    await connection('customer')
    .where({ id: id})
    .update({
        photo: photo
    })
    .then(u => response.status( !!u ? 200:404 ).json( {success:!!u} ))
    .catch(e => response.status(500).json(e));
}

module.exports = { getCustomer, saveCustomer, updateCustomer, updateCustomerPhoto }