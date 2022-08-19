const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    email: {
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
    agentPackage: {
      type: String,
    },
    agentWallet: {
      type: Number,
      default: 0,
    },
    reward: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
    },
    referred: {
      type: Array,
    },
    reference: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Agent', AgentSchema)
