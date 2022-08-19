const mongoose = require('mongoose')

const UserPackageSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
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
  { timestamps: true },
)

module.exports = mongoose.model('UserPackage', UserPackageSchema)
