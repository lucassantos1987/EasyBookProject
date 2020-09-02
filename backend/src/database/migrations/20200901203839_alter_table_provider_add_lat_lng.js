exports.up = function(knex) {
    return knex.schema.alterTable('provider', function(table) {
        table.string('latitude');
        table.string('longitude');
    })
};

exports.down = function(knex) {
  
};
