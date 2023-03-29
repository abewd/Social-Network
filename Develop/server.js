// Import the express, connection and routes models

//  port numebrs

// declare app variables for express

// middleware
// do we need to know this stuff? and what it does?
// A format of writing urls, it will handle spaces in the URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// .use for routes

// database connection, std
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
