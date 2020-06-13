exports.up = function(knex) {
    return knex.schema.alterTable('provider', function(table) {
        table.string('photo').notNullable();
    })
};

exports.down = function(knex) {
  
};
