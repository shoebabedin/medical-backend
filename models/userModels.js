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
    phone: {
      type: String,
      require: [true, "phone is required"],
    },
    h_name: {
      type: String,
      require: [true, "Hospital Name is required"],
    },
    position: {
      type: String,
      require: [true, "position is required"],
    },
    bmdcRegNo: {
      type: String,
      require: [true, "BMDC RegNo is required"],
    },
    profile_img: {
      type: String,
      require: [true, "Profile Image is required"],
    },
    doctor_sign: {
      type: String,
      require: [true, "Doctor Sign is required"],
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

