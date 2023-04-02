// Import the express, connection and routes models
const express = require("express");
const faker = require("faker");
const db = require("../Develop/config/connection");
const routes = require("./routes");

//  Insert port access
const PORT = process.env.PORT || 3001;

// declare app variables for express
const app = express();

// Use middleware
// A format of writing urls, it will handle spaces in the URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// .use for routes
app.use(routes);

// database connection, std
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
