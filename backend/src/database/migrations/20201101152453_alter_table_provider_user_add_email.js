exports.up = function(knex) {
    return knex.schema.alterTable('provider_user', function(table) {
        table.string('email', 50).notNullable();
    })
};

exports.down = function(knex) {
  
};