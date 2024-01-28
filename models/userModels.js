const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const degreeSchema = new Schema({
  degree: String,
  specialized: String,
});
const userSchema = new Schema(
  {
    role: {
      type: String,
      require: [true, "Role is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    degrees: [degreeSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);

