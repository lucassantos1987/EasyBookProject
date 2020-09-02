exports.up = function(knex) {
    return knex.schema.alterTable('provider', function(table) {
        table.string('username', 100).unique().notNullable();
        table.string('password', 8).notNullable();
    })  
};

exports.down = function(knex) {
  
};
