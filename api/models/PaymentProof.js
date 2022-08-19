const mongoose = require("mongoose");

const PaymentProofSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    amount: {
      type: String,
    },
    paymentFor: {
      type: String,
    },
    reference: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentProof", PaymentProofSchema);
