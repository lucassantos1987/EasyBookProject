const connDB = require('../database/connDB');

async function signIn(request, response) {
    const email = request.query.email;
    const password = request.query.password;

    const client = await connDB.connect();

    var sql = "select "
                + "id_customer, "
                + "email, "
                + "password "
                + "from customer_user "
                + "where email = '" + email + "' "
                + "and password = '" + password + "'";

    const result = await client.query(sql);
    client.release();

    if (Object.keys(result.rows).length !== 0) {
        return result.rows[0].id_customer;
    } else {
        return 0;
    }
}

module.exports = { signIn }