var express = require("express");
var app = express();

var env = require("./config/env");

// start server
var PORT = env.port;

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

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
    process.exit(1); // Exit the process with an error code
  }
}

startServer();
