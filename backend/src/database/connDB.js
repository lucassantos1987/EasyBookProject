async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:postgres@localhost:5432/easybook'
    });

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL");

    global.connection = pool;
    return pool.connect();
}

module.exports = { connect }