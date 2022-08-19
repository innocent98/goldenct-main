const mongoose = require("mongoose");

const WithdrawSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    amount: {
      type: Number,
    },
    withdrawableAmount: {
      type: Number,
    },
    bank: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    accountName: {
      type: String,
    },
    remark: {
      type: String,
    },
    account: {
      type: String,
    },
    reference: {
      type: String,
      unique: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Withdraw", WithdrawSchema);
