exports.up = function(knex) {
    return knex.schema.createTable('provider_user', function(table) {
        table.increments().primary();
        table.integer('id_provider').notNullable();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.foreign('id_provider').references('provider.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('provider_user');
};
