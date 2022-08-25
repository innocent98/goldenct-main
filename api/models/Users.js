const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    fullName: {
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
      default: "Subscriber",
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    lga: {
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
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmationCode: {
      type: Number,
    },
    resendConfirmationCodeIn: {
      type: Number,
      default: 0,
    },
    identity: {
      type: Array,
    },
    picture: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
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
    taskDone: {
      type: Array,
    },
    currency: {
      type: String,
      default: "#",
    },
    referee: {
      type: String,
    },
    time: {
      type: Number,
      default: 0,
    },
    pendingJob: {
      type: Number,
      default: 0,
    },
    successfulJob: {
      type: Number,
      default: 0,
    },
    rejectedJob: {
      type: Number,
      default: 0,
    },
    rejectedSubmission: {
      type: Number,
      default: 0,
    },
    pendingSubmission: {
      type: Number,
      default: 0,
    },
    successfulSubmission: {
      type: Number,
      default: 0,
    },
    bank: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    transactionPin: {
      type: String,
    },
    currentTransactionPin: {
      type: String,
    },
    isPinSet: {
      type: Boolean,
      default: false,
    },
    isLoggedout: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
