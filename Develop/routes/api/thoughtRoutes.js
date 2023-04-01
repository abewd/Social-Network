// Require express router
const router = require("express").Router();

// Require thoughts/reations method
const {
  createThought,
  getThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
  getThoughts,
} = require("../../controllers/thoughtController");

// Require all paths for the above
// This is the mainpage
router.route("/").get(getThought);

// Route for creating a post
router.route("/:userId").post(createThought);

// RRoute for finding a thought using an Id
// Then updating it
router.route("/:thoughtId").get(getSingleThought).put(updateThought);

// Get a thought then delete it
router.route("/:thoughtId/users/:userIddel").delete(deleteThought);

// Add reaction
router.route("/:thoughtId/reactions").post(addReaction);

// Find thoughtId then delete reactionId / reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Export all dis tings
module.exports = router;
