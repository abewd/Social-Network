// Import connect and connection objects from the mongoose library
const { connect, connection } = require("mongoose");

// Connect the mongoose database to the local host
connect("mongodb://localhost/socialNetwork", {
  // Tells mongoDB that a new user is parsed / introduced
  useNewUrlParser: true,
  // Utilise the new engine if required
  useUnifiedTopology: true,
});

// Export the connection to be utilised by other models
module.exports = connection;
