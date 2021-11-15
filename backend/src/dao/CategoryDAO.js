const connDB = require('../database/connDB');

async function getCategoryProvider(request, response) {
    
    const filterName  = request.query.name;
    const conn = await connDB.connect();

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

    const result = await conn.query(sql);
    conn.release();

    return response.json( result.rows );    
}

async function getCategory(request, response) {
    
    const filterName  = request.query.name;
    const conn = await connDB.connect();

    var sql = "select"
	            + " c.id,"
	            + " c.name"
                + " from category c"

    if (filterName) {
        sql = sql + " where name like '%" +filterName + "%'";
    }

    sql = sql+ " order by c.name";

    const result = await conn.query(sql);
    conn.release();

    return response.json( result.rows );    
}

async function saveCategory(request, response) {
    
    const { name } = request.body;
    const conn = await connDB.connect();

    const sql = "insert into category(name)"
            + "values ($1);";
    const values = [ name ];

    const result = await conn.query(sql, values);

    return response.json( result );
}

async function checkCategory(request, response) {

    const name = request.query.name;
    const conn = await connDB.connect();

    const sql = "select count(*) as quantidade where name = '" + name + "'";

    const result = conn.query(sql);
    conn.release();
   
    return response.json( result.rows );
}

module.exports = { getCategoryProvider, getCategory, saveCategory, checkCategory }