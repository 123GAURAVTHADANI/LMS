var express = require("express");
var app = express();

var env = require("./config/env");
require("dotenv").config();

// start server
var PORT = env.port;

async function startServer() {
  try {
    const { sequelize } = require("./config/database");
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
