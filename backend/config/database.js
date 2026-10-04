const { sequelize } = require("../models");

const env = require("./env");

// desstructuring the database configuration from env.js
const { database, username, password, host, dialect } = env.db;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: false, // Disable logging for cleaner output,
  dialectModule: require("mysql2"), // Specify the MySQL dialect module
});

module.exports = { sequelize };
