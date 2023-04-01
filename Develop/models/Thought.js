// Imoprt  mongoose
const { Schema, model } = require("mongoose");

// Define the schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: String,
      format: date - time,
      default: "2023",
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
