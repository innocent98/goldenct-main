const mongoose = require("mongoose");

const TaskProofSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    jobId: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    shortDesc: {
      type: String,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
    },
    poster: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDeclined: {
      type: Boolean,
      default: false,
    },
    declineReason: {
      type: String,
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaskProof", TaskProofSchema);
