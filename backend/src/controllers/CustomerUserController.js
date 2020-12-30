const connection = require('../database/connection');

module.exports = {

    async signin(request, response) {
        const email = request.query.email;
        const password = request.query.password;

        const result = await connection('customer_user')
            .select('id_customer',
                'email',
                'password'
            )
            .where('email', '=', email)
            .andWhere('password', '=', password);

        return response.json(result);
    }

}