// backend/config/database.js
const config = require('./index');

// Neon connection strings may include channel_binding, which node-postgres doesn't accept.
if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(/([?&])channel_binding=[^&]*&?/, '$1').replace(/[?&]$/, '');
}

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    // Hosted Postgres (Neon) needs SSL; a local Postgres in CI does not.
    dialectOptions: process.env.DB_SSL === 'false' ? {} : {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};
