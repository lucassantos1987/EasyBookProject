exports.up = function(knex) {
    return knex.schema.alterTable('provider', function(table) {
        table.string('last_name', 30).notNullable();
    })  
};

exports.down = function(knex) {
  
};
