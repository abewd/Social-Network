// Imoprt  mongoose
const { Schema, model } = require("mongoose");

// Define the schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    toJSON: {
      // This just allows virtuals to work with the schema
      virtuals: true,
    },
    // We dont need 2 ID numbers, the ObjectId is sufficient
    id: false,
  }
);

// Create virtual and model
userSchema.virtual("friendCount").get(function () {
  return `friends: ${this.friends.length}`;
});

// Use the schema to make a model
const User = model("User", userSchema);

// Export data
module.exports = User;
