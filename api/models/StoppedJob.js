const mongoose = require("mongoose");

const StoppedJobSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    isStopped: {
      type: Boolean,
      default: true,
    },
    jobTitle: {
      type: String,
    },
    totalPayable: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StoppedJob", StoppedJobSchema);
