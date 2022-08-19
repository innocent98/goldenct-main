const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    feed: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
