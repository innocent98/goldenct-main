const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    jobDesc: {
      type: String,
    },
    jobCat: {
      type: String,
    },
    jobSubCat: {
      type: String,
    },
    workers: {
      type: Number,
    },
    applied: {
      type: Number,
      default: 0,
    },
    jobLink: {
      type: String,
    },
    amount: {
      type: Number,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    reference: {
      type: String,
    },
    picture: {
      type: String,
    },
    totalPayable: {
      type: Number,
    },
    sponsored: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
