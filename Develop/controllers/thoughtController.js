// Require the models for Thought and User
const { User, Thought } = require("../models");

// Export methods for the Thought
module.exports = {
  getThoughts(req, res) {
    // Get all thoughts
    Thought.find()
      // Convert the thoughts to a json to be uploaded to Insomnia
      .then((thoughts) => res.json(thoughts))
      // If an error occurs, log it as a server error
      .catch((err) => res.status(500).json(err));
  },

  // Get a Thought from an ID
  // Utilise the api/thought/thoughtID
  getSingleThought(req, res) {
    // Find a Thought based on the given Id required
    Thought.findOne({ _id: req.params.thoughtId })
      .then(
        // If the thoughteText does not exist display an error
        (thoughtText) =>
          !thoughtText
            ? // If ID not recognised
              res.status(404).json({ messgae: "No Thought with this ID" })
            : // If it is
              res.json(thoughtText)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new Thought
  // Request paramater and a body, the response will be...
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          // Push the thought to the db by utilising the ID
          { _id: params.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        )
          // And then if they dont match, it means the user ID is incorrect, otherwise return the thought
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No User with this ID" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a Thought
  // request the id then...
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtID }, body, {
      new: true,
    })
      // if the id matches a thought you can insert new Json "new: true"
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought with this ID" });
          return;
        }
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtID } }
        )
          .then(() => {
            res.status(200).json({
              message: `Successfully deleted the thought from user id ${params.userId}`,
            });
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  //Add a reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this Id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  //Delete a reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this Id" });
          return;
        }
        res.json({ message: "Successfully deleted reaction" });
      })
      .catch((err) => res.status(500).json(err));
  },
};
