const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    currentPassword: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
    },
    currentAuth: {
      type: String,
    },
    role: {
      type: String,
      default: "Validator",
    },
    gender: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
