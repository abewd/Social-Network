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
      type: Date,
      default: Date.now,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    username: {
      type: String,
      required: true,
    },

    reactions: {
      type: String,
      required: true,
    },
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
thoughtSchema.virtual("friendCount").get(function () {
  return `friends: ${this.friends.length}`;
});

// Use the schema to make a model
const Thought = model("Though", thoughtSchema);

// Export data
module.exports = Thought;
