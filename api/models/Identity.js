const mongoose = require("mongoose");

const IdentitySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    email: {
      type: String,
    },
    front: {
      type: String,
    },
    back: {
      type: String,
    },
    reference: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Identity", IdentitySchema);
