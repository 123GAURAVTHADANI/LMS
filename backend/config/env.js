require("dotenv").config();

const env = {
  port: Number(process.env.PORT) || 3000,
  db: {
    database: process.env.DB_NAME || "library_management_system",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Mysql123",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  finePerDay: Number(process.env.FINE_PER_DAY) || 50,
};

module.exports = env;
