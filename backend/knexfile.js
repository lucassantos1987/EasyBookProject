// Update with your config settings.

module.exports = {

  development: {
    /*client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }*/
    client: 'postgresql',
    connection: {
      database: 'easybook',
      user:     'postgres',
      password: 'postgres',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
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
    client: 'postgresql',
    connection: {
      host: '34.70.25.193',
      database: 'azbookapp',
      user:     'postgres',
      password: 'az2020book'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
