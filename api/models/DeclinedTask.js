const mongoose = require('mongoose')

const DeclinedTaskSchema = new mongoose.Schema(
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
    shortDesc: {
      type: String,
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
  },
  { timestamps: true },
)

module.exports = mongoose.model('DeclinedTask', DeclinedTaskSchema)
