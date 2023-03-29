const router 
const apiRoutes 

// .use fro api routes 
router.use("/api", apiroutes )

router.use((req, res) => res.send("wrong route"))

// export the router 