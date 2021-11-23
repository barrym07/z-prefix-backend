
exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('user_name').notNullable().references('username').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('posts');
};
