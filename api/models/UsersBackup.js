const mongoose = require('mongoose')

const UserBackupSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    otherName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Subscriber',
    },
    address: {
      type: String,
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    identity: {
      type: Array,
    },
    picture: {
      type: String,
    },
    package: {
      type: String,
    },
    mineWallet: {
      type: Number,
      default: 0,
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
    taskWallet: {
      type: Number,
      default: 0,
    },
    task: {
      type: Array,
    },
    currency: {
      type: String,
      default: '#',
    },
    referee: {
      type: String,
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('UsersBackup', UserBackupSchema)
