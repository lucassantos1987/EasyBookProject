const Knex = require('knex');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
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
    }, 

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

        await trx('customer').insert({
            first_name,
            last_name,
            whatsapp,
            photo
        })
        .returning('id')
        .then(id => {

            const id_customer = id[0];

            trx('customer_user').insert({
                id_customer,
                email,
                password
            })
            .then(function() {
                return response.json({ res: "Cadastro realizado com sucesso." });
            })
            .catch(function(error) {
                console.log(error.message);
                
                return response.json({ res: error.message });
            });
    
        })
        .catch(function(error) {            
            return response.json({ res: error.message })
        });

        trx.commit();

        return;
            
    },

    async updateData(request, response) {
        const {
            id,
            first_name,
            last_name,
            whatsapp
        } = request.body;

        await connection('customer')
        .where({ id: id})
        .update({ 
            first_name: first_name,
            last_name: last_name,
            whatsapp: whatsapp
        })
        .then(u => response.status( !!u ? 200:404 ).json( {success:!!u} ))
        .catch(e => response.status(500).json(e));
    },

    async updatePhoto(request, response) {
        const {
            id,
            photo
        } = request.body;

        await connection('customer')
        .where({ id: id})
        .update({
            photo: photo
        })
        .then(u => response.status( !!u ? 200:404 ).json( {success:!!u} ))
        .catch(e => response.status(500).json(e));
    }
    
}