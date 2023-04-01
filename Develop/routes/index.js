// Import router and apiRoutes
const router = require("express").Router();
const apiRoutes = require("./api");

// .use for API routes
router.use("/api", apiroutes);
router.use((req, res) => res.send("wrong route"));

// export the router
module.exports = router;
