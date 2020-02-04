
exports.up = function(knex) {
    return knex.schema
    .createTable('reviews', tbl => {
        tbl.increments('id');

        tbl.text('description').notNullable();
        
        tbl.integer('rating').notNullable();
        
        tbl.text('image');
        
        tbl.integer("stylist_id").unsigned()
        .references("stylist.id")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

        tbl.integer("customer_id").unsigned()
        .references("customer.id")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

    })

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('reviews')
};