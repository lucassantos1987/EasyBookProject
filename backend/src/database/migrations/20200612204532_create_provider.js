exports.up = function(knex) {
    return knex.schema.createTable('provider', function(table) {
        table.increments().primary();
        table.string('name', 60).notNullable();
        table.string('address', 60).notNullable();
        table.string('number', 10).notNullable();
        table.string('complement', 20);
        table.string('district', 30).notNullable();
        table.string('city', 60).notNullable();
        table.string('state', 2).notNullable();
        table.string('zip_code', 8).notNullable();
        table.string('email', 100).notNullable();
        table.string('whatsapp', 15).notNullable();
        table.string('obs');
    });
};

exports.down = function(knex) {
    return knex.dropTable('provider');
};