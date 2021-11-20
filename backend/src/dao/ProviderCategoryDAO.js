const connDB = require('../database/connDB');

async function getProviderCategory(request, response) {

    const filterCategory = request.query.id_category;
    const client = await connDB.connect();
    const sql = "select \n"
                + "	p.id,\n"
                + "	p.name,\n"
                + "	p.last_name,\n"
                + " p.photo,\n"
                + "	rp.rating\n"
                + "from provider_category pc	\n"
                + "join provider p on p.id = pc.id_provider \n"
                + "join category c on c.id = pc.id_category \n"
                + "join (select \n"
                + "			id_provider,\n"
                + "			sum(rating) / count(id_provider) as rating\n"
                + "		from rating_provider\n"
                + "		group by id_provider) as rp on rp.id_provider = p.id\n"
                + "where c.id = " + filterCategory;
    
    const result = await client.query(sql);
    client.release();


    return response.json( result.rows );
}

module.exports = { getProviderCategory }