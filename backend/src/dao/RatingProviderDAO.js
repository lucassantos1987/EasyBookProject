const connDB = require('../database/connDB');

async function getRatings(request, response) {
    
    const id_provider = request.query.id_provider;

    const client = await connDB.connect();
    const sql = "select"
                	+ " rp.id,"
	                + " rp.id_customer,"
	                + " rp.id_provider,"
                    + " rp.rating,"
                    + " rp.title_rating,"
                    + " rp.description_rating,"
                    + " to_char(rp.date_rating, 'dd/mm/yyyy') as date_rating, "
                    + " (c.first_name||' '||c.last_name) as name_customer"
                    + " from rating_provider rp"
                    + " join customer c on c.id = rp.id_customer"
                    + " where rp.id_provider = 14" 
                    + " order by rp.date_rating desc";

    const result = await client.query(sql);
    client.release();

    return response.json( result.rows );
}

module.exports = { getRatings }