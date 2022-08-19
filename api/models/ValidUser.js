const mongoose = require("mongoose");

const ValidUserSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    isDeclined: {
      type: Boolean,
      default: false,
    },
    declinedReason: {
      type: String,
    },
    userPackage: {
      type: String,
    },
    reference: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ValidUser", ValidUserSchema);
