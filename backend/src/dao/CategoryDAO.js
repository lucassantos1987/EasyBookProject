const connDB = require('../database/connDB');

async function getCategoryProvider(request, response) {
    
    const filterName  = request.query.name;
    const client = await connDB.connect();

    var sql = "select"
	            + " count(pc.*) as quantidade,"
	            + " c.id,"
	            + " c.name"
                + " from category c"
                + " left join provider_category pc"
                + " on pc.id_category = c.id"

    if (filterName) {
        sql = sql + " where name like '%" +filterName + "%'";
    }

    sql = sql + " group by c.id, c.name"
              + " having count(pc.*) > 0"
              + " order by c.name";

    const result = await client.query(sql);
    client.release();

    return response.json( result.rows );    
}

async function getCategory(request, response) {
    
    const filterName  = request.query.name;
    const client = await connDB.connect();

    var sql = "select"
	            + " c.id,"
	            + " c.name"
                + " from category c"

    if (filterName) {
        sql = sql + " where name like '%" +filterName + "%'";
    }

    sql = sql+ " order by c.name";

    const result = await client.query(sql);
    client.release();

    return response.json( result.rows );    
}

async function saveCategory(request, response) {
    
    const { name } = request.body;
    const client = await connDB.connect();

    try {
        await client.query("BEGIN");
        
        const sql = "insert into category(name) values ($1);";
        const values = [ name ];

        await client.query(sql, values);
        await client.query("COMMIT");

        return response.json({ message: "Cadastro realizado com sucesso." });
    } catch (e) {
        return response.json({ message: "ERRO: " + e.stack });
    } finally {
        client.release();
    }
}

async function checkCategory(request, response) {

    const name = request.query.name;
    const client = await connDB.connect();

    const sql = "select count(*) as quantidade where name = '" + name + "'";

    const result = client.query(sql);
    client.release();
   
    return response.json( result.rows );
}

module.exports = { getCategoryProvider, getCategory, saveCategory, checkCategory }