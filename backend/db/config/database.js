require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'vagrigator',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres'
  },
  test: {},
  production: {}
};