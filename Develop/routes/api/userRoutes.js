// Require express router
const router = require("express").Router();

// Require User/Friends method
const {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Mainpage
router.route("/").get(getUsers).post(createUser);

// Find user ID
// get will get a single user
// put will update
// delete will obvs delete that user
router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser);

// Search userId then search friendId and add, then delete if you want
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export all dis tings fam
module.exports = router;
