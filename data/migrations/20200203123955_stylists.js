
exports.up = function(knex) {
  return knex.schema.createTable('stylists', tbl => {
      tbl.increments('id');
      tbl.text('username').unique().notNullable();
      tbl.text('password').notNullable();
      tbl.text('location').notNullable();
      tbl.text('email').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('stylists');
};
