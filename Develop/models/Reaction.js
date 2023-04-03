// only a schema, no model because its just an additonal comment
// there is no model generation here, weird

// This line imports the schema and the types compared to the other lines which
// imports the schema and the models

// It just means we dont need to make a model using that line
const { Schema, Types } = require("mongoose");
// Import the moment.js library
const moment = require("moment");
const { schema } = require("./User");

// Define the schema

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      // Auto fills the object id
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },

    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter method to format the timestamp on query
      get: (createdAtVal) =>
        // This will reformat the dates into the aussie version, otherwise its MM DD YY which is mid bruh
        moment(createdAtVal).format("DD MM, YY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      // Include virtuals, MG wont do it automatically. SOOO mid.
      getters: true,
    },
    id: false,
  }
);

// Export reactions
module.exports = reactionSchema;
