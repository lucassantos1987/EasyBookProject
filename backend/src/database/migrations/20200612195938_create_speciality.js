exports.up = function(knex) {
    return knex.schema.createTable('speciality', function(table) {
        table.increments().primary();
        table.integer('id_category').notNullable();
        table.string('name').notNullable();
        table.foreign('id_category').references('category.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('speciality');
};
