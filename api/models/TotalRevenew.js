const mongoose = require("mongoose");

const TotalRevenewSchema = new mongoose.Schema(
  {
    in: {
      type: Number,
      default: 0,
    },
    out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TotalRevenew", TotalRevenewSchema);
