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

async function saveRating(request, response) {
    
    const {
        id_provider,
        id_customer,
        rating,
        title_rating,
        description_rating
    } = request.body;

    try {

        const client = await connDB.connect();

        await client.query("BEGIN");

        const insert_rating = "insert into rating_provider(id_provider, id_customer, rating, title_rating, description_rating) \n"
                            + "values (\n"
                            + "$1, $2, $3, $4, $5);";
        const values_rating_provider = [id_provider, id_customer, rating, title_rating, description_rating];
        
        const result = await client.query(insert_rating, values_rating_provider);

        await client.query("COMMIT");

        return response.json({ message: "Avaliação enviada com sucesso. Obrigado pela sua avaliação." });
    } catch (e) {
        return response.json({ message: e.stack });
    } finally {
        client.release();
    }
}

module.exports = { getRatings, saveRating }