const mongoose = require("mongoose");

const TopWalletSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopWallet", TopWalletSchema);
