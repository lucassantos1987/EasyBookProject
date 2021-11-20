const connDB = require('../database/connDB');

async function getProvider(request, response) {
    
    const id_provider = request.query.id_provider;
    const client = await connDB.connect();

    var sql = "select \n"
            + "	    p.name,\n"
            + "     p.last_name,\n"
            + "     p.address,\n"
            + "     p.number,\n"
            + "     p.district,\n"
            + "     p.city,\n"
            + "     p.state,\n"
            + "     p.zip_code,\n"
            + "     p.photo,\n"
            + "     p.prefix_whatsapp,\n"
            + "     p.whatsapp,\n"
            + "     p.obs,\n"
            + "     rp.rating\n"
            + "from provider p\n"
            + "join (select \n"
            + "			id_provider,\n"
            + "			sum(rating) / count(id_provider) as rating\n"
            + "		from rating_provider\n"
            + "		group by id_provider) as rp on rp.id_provider = p.id\n"
            + "where p.id = " + id_provider;

    
    const result = await client.query(sql);
    client.release();

    return response.json( result.rows );
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

    try {
        const client = await connDB.connect();

        await client.query("BEGIN");

        const insert_provider = "insert into category(name, last_name, address, number, complement,"
                            + " district, city, state, zip_code, whatsapp, obs, photo, latitude, longitude)"
                            + "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning id;";
        const values_provider = [name, last_name, address, number, complement, district, city, 
                            state, zip_code, whatsapp, obs, photo, latitude, longitude];

        const result = await client.query(insert_provider, values_provider);
        const id_provider = result.rows[0].id;

        const insert_provider_category = "insert provider_category(id_provider, id_category)"
                                        + " values ($1, $2);"
        const values_provider_category = [id_provider, id_category];
        await client.query(insert_provider_category, values_provider_category);

        const insert_provider_user = "insert into provider.user(id_provider, email_address, password)"
                                        + "values ($1, $2, $3);";
        const values_provider_user = [id_provider, email_address, password];
        await client.query(insert_provider_user, values_provider_user);

        await client.query("COMMIT");

        return response.json({ message: "Cadastro realizado com sucesso." });
    } catch (e) {
        return response.json({ message: e.stack });
    } finally {

    }
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

    try {
        const client = await connDB.connect();

        await client.query("BEGIN");

        const sql = "update provider"
                    + " set"
                    + " name = $1,"
                    + " last_name = $2,"
                    + " address = $3,"
                    + " number = $4,"
                    + " district = $5,"
                    + " city = $6,"
                    + " state = $7,"
                    + " zip_code = $8,"
                    + " whatsapp = $9"
                    + " latitude = $10,"
                    + " longitude = $11,"
                    + " obs = $12"
                    + " where id = $13";
        const values = [name, last_name, address, number, district, city, state, zip_code, whatsapp, latitude, longitude, obs, id];

        await client.query(sql, values);
        await client.query("COMMIT");

        return response.json({ message: "Cadastro atualizado com sucesso." });
    } catch (e) {
        return response.json({ message: e.stack });
    } finally {
        client.release();
    }
}

async function updateProviderPhoto(request, response) {
    const {
        id,
        photo
    } = request.body;

    try {
        const client = await connDB.connect();

        await client("BEGIN");

        const sql = "update provider set photo = $1 where id = $2;";
        const values = [photo, id];

        await client.query(sql, values);
        await client("COMMIT");

        return response.json({ message: "Foto atualizada com sucesso." });
    } catch (e) {
        return response.json({ message: e.stack });
    } finally {
        client.release();
    }
}

module.exports = { getProvider, saveProvider, updateProvider, updateProviderPhoto }