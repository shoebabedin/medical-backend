const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending"
    },
    date: {
      type: String,
      require: [true, "Name is required"]
    },
    report_title: {
      type: String,
      require: [true, "email is required"]
    },
    patient_name: {
      type: String,
      require: [true, "password is required"]
    },
    gender: {
      type: String,
      require: [true, "phone is required"]
    },
    preferred_doctor: {
      type: Schema.Types.ObjectId,
      ref: 'users',  // Reference to the User model
      required: [true, "Preferred Doctor is required"]
    },
    department: {
      type: String,
      require: [true, "position is required"]
    },
    report_type: {
      type: String,
      require: [true, "BMDC RegNo is required"]
    },
    report_id: {
      type: String,
      require: [true, "address is required"]
    },
    age: {
      type: String,
      require: [true, "map_location is required"]
    },
    report_image: {
      type: String,
      require: [true, "Profile Image is required"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("report", reportSchema);
