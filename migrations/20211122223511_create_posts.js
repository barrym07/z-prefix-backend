
exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('body').notNullable();
    table.date('created_at').notNullable();
    table.string('user_name').notNullable().references('username').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('posts');
};
