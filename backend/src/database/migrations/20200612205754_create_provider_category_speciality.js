exports.up = function(knex) {
    return knex.schema.createTable('provider_category_speciality', function(table) {
        table.increments().primary();
        table.integer('id_provider').notNullable();
        table.integer('id_category').notNullable();
        table.integer('id_speciality').notNullable();
        table.foreign('id_provider').references('provider.id');
        table.foreign('id_category').references('category.id');
        table.foreign('id_speciality').references('speciality.id');
    })
};

exports.down = function(knex) {
    return knex.dropTable('provider_category_speciality');
};
