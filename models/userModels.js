const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    require: [true, "Role is required"]
  },
  name: {
    type: String,
    default: [true, "Name is required"]
  },
  email: {
    type: String,
    require: [true, "email is required"]
  },
  password: {
    type: String,
    require: [true, "password is required"]
  },
  notification: {
    type: Array,
    default: []
  },
  seenNotification: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("users", userSchema);
