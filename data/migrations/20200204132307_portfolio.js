exports.up = function(knex) {
    return knex.schema
    .createTable('portfolio', tbl => {
        tbl.increments('id');

        tbl.text('description').notNullable();
        
        tbl.text('image');
        
        tbl.integer("stylist_id").unsigned()
        .references("stylist.id")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('portfolio')
};