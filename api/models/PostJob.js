const mongoose = require("mongoose");

const PostJobSchema = new mongoose.Schema(
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
    jobLink: {
      type: String,
    },
    amount: {
      type: Number,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDeclined: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
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
      type:  Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PostJob", PostJobSchema);
