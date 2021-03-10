
exports.up = function(knex) {
    return knex.schema
    .createTable('orphanage',function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('latitude',15).notNullable();
        table.string('longitude',15).notNullable();
        table.string('whatsapp',20).notNullable();
        table.string('about').notNullable();
        table.string('instructions').notNullable();
        table.string('opening_hours').notNullable();
        table.string('open_on_weekends').notNullable();
    })
    .createTable('image',function(table){
        table.string('id').primary();
        table.string('path').notNullable();
        table.specificType('file','LONGBLOB');
        table.string('orphanageid');
        table.foreign('orphanageid').references('id').inTable('orphanage');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('orphanages')
};
