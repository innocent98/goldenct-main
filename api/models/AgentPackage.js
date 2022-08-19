const mongoose = require("mongoose");

const AgentPackageSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    agentPackage: {
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

module.exports = mongoose.model("AgentPackage", AgentPackageSchema);
