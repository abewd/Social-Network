// Connect to the main connection
const connection = require("../config/connection");
const { faker } = require("@faker-js/faker");

// Import the User and Thought models from the models folder
const { User, Thought } = require("../models");

// If an error occurs whilst trying to connect, display an error message
connection.on("error", (err) => console.error(err));

// Wrap the code in an async function to use await
async function seedDatabase() {
  // If connection is successful...
  connection.once("open", async () => {
    console.log("connected");

    try {
      // Drop existing Thought DB
      // Clear database
      await Thought.deleteMany({});

      // Drop existing User DB
      await User.deleteMany({});

      // Import the 'faker' library for generating random data

      // Create the array of usernames and emails
      // Create 20 random users and emails
      const userArray = [];
      for (let i = 0; i < 20; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        userArray.push({ username, email });

        // Create a new User object for each item in the array
        const user = new User({ username, email });
        await user.save();
      }

      // Output the number of users created
      console.log(`${userArray.length} users created`);
    } catch (err) {
      console.error(err);
    } finally {
      // Close the connection when finished
      connection.close();
    }
  });
}

// Call the async function to start the process
seedDatabase();
