// Update with your config settings.
require("dotenv").config();


// THIS IS YOUR PRODUCTION CONNECTION - NOTE THE SSL SETTING
const connection = {
  connectionString: process.env.DATABASE_URL, // IMPORTANT - HEROKU SETS THIS AND CHANGES IT PERIODICALLY
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection,
  },
};
