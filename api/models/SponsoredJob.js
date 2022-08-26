const mongoose = require("mongoose");

const SponsoredJobSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    jobDesc: {
      type: String,
      default: "Download picture image and post on all your social handles",
    },
    picture: {
      type: String,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
    },
    sponsored: {
      type: Boolean,
      default: true,
    },
    applied: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SponsoredJob", SponsoredJobSchema);
