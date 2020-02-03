// Update with your config settings.
const db ="https://haircare-backend-dingo.herokuapp.com/"

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/haircare.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.db,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: './database/seeds',
    },
  }

};