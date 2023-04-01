// Import express router
const router = require("express").Router();
// Import userRoutes
const userRoutes = require("./userRoutes");
// Import thoughtRoutes
const thoughtRoutes = require("./thoughtRoutes");
const { pid } = require("process");

// .use for users and thoughts routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

// Export it like its oil - Saudi
module.exports = router;
