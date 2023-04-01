// Require the models for Thought and User
const { User, Thought } = require("../models");

// Export methods for the User
module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find({})
      // Convert the Thought retreived to JSON
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single User by their ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // I dont understand the below:
      // Populate is a mongoose method, it will connect
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      // I dont understand the above:
      .then((dbUserData) => {
        // If empty
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID" });
          return;
        }
        res.json(dbUserData);
      });
  },
  // Create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Update a User
  updateSingleUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a User
  deleteSingleUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        User.updateMany(
          { _id: { $in: dbUserData.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            Thought.deleteMany({ username: dbUserData.username })
              .then(() => {
                res.json({
                  message:
                    "Successfully deleted user, associated friend(s) and associated thought(s)",
                });
              })
              .catch((err) => res.status(500).json(err));
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  //Add a Friend by Id
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  //Delete a friend by Id
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },
};
