const User = require("../models/userModels");
const Report = require("../models/hospitalreportModels");
const bcrypt = require("bcryptjs");

// all hospital list models
const AllHospitalsController = async (req, res) => {
  const allHospital = await User.find({ role: "hospital" });

  res.json(allHospital);
};

// all requested hospital
const AllRequestedHospitalsController = async (req, res) => {
  const allHospital = await User.find({ role: "hospital", status: "pending" });

  res.json(allHospital);
};

// all registered hospital
const AllRegisteredHospitalsController = async (req, res) => {
  const allHospital = await User.find({ role: "hospital", status: "accepted" });

  res.json(allHospital);
};

// all registered doctors
const NewHospitalAddController = async (req, res) => {
  const { name, email, password, phone, address, map_location } = req.body;

  const profileImgPath = req.files.hospital_img
    ? req.files.hospital_img[0].path +
      "." +
      req.files.hospital_img[0].originalname.split(".").pop()
    : null;

  if (!name) {
    return res.status(403).json({ message: "Please enter your Name" });
  } else if (!email) {
    return res.status(403).json({ message: "Please enter your Email" });
  } else if (!password) {
    return res.status(403).json({ message: "Please enter your Password" });
  } else if (!phone) {
    return res.status(403).json({ message: "Please enter your Phone" });
  } else if (!address) {
    return res.status(403).json({ message: "Please enter a valid address" });
  } else if (!map_location) {
    return res
      .status(403)
      .json({ message: "Please enter a valid map location" });
  } else if (!profileImgPath) {
    return res
      .status(403)
      .json({ message: "Please enter a valid hospital img" });
  } else {
    const duplicate = await User.find({ email: email });

    if (duplicate.length > 0) {
      return res.status(403).json({ message: "Duplicate Name" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = await User({
        role: "hospital",
        name,
        email,
        password: hash,
        phone,
        address,
        map_location,
        profile_img: profileImgPath
      });
      user.save();
      if (user) {
        res.status(200).json({ success: `New user ${user.name} created` });
      } else {
        res.status(400).json({ message: `Invalid user data received` });
      }
    });
  }
};

const UpdateHospitalController = async (req, res) => {
  const { id, name, email, phone, address, map_location } = req.body;

  const profileImgPath = req.files.hospital_img
    ? req.files.hospital_img[0].path +
      "." +
      req.files.hospital_img[0].originalname.split(".").pop()
    : null;

  if (!name || !email || !phone || !address || !map_location || !id) {
    return res.status(403).json({
      message: "Missing or invalid parameters for updating user information"
    });
  }

  try {
    const existingUser = await User.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the existing user's information
    existingUser.name = name;
    existingUser.email = email;
    existingUser.phone = phone;
    existingUser.address = address;
    existingUser.map_location = map_location;

    if (profileImgPath) {
      existingUser.profile_img = profileImgPath;
    }

    // Save the updated user to the database
    await existingUser.save();

    res.status(200).json({
      success: `User ${existingUser.name} updated successfully`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addNewReportController = async (req, res) => {
  const {
    date,
    report_title,
    patient_name,
    gender,
    preferred_doctor,
    department,
    report_type,
    report_id,
    age
  } = req.body;

  const reportImg = req.files.report_image
    ? req.files.report_image[0].path +
      "." +
      req.files.report_image[0].originalname.split(".").pop()
    : null;

  if (
    !date ||
    !report_title ||
    !patient_name ||
    !gender ||
    !preferred_doctor ||
    !department ||
    !report_type ||
    !report_id ||
    !age
  ) {
    return res.status(403).json({
      message: "Missing or invalid parameters for updating report information"
    });
  }

  try {
    const duplicate = await Report.find({ report_id: report_id });

    if (duplicate.length > 0) {
      return res.status(403).json({ message: "Duplicate Report" });
    }
    const report = await Report({
      date,
      report_title,
      patient_name,
      gender,
      preferred_doctor,
      department,
      report_type,
      report_id,
      age,
      report_image: reportImg
    });

    report.save();

    if (report) {
      res.status(200).json({
        success: `New report: ${report.report_title} - name: ${report.patient_name} created`
      });
    } else {
      res.status(400).json({ message: `Invalid user data received` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const allReportController = async (req, res) => {
  try {
    const allReports = await Report.find().populate("preferred_doctor");
    res.json(allReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const completeReportController = async (req, res) => {
  try {
    const allCompleteReport = await Report.find({
      status: "accepted"
    }).populate("preferred_doctor");
    res.json(allCompleteReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const pendingReportController = async (req, res) => {
  try {
    const allPendingReport = await Report.find({ status: "pending" }).populate(
      "preferred_doctor"
    );
    res.json(allPendingReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editReportController = async (req, res) => {
  const {
    id,
    date,
    report_title,
    patient_name,
    gender,
    preferred_doctor,
    department,
    report_type,
    report_id,
    age,
    report_comment
  } = req.body;

  const reportImg = req.files.report_image
    ? req.files.report_image[0].path +
      "." +
      req.files.report_image[0].originalname.split(".").pop()
    : null;
  if (
    !id ||
    !date ||
    !report_title ||
    !patient_name ||
    !gender ||
    !preferred_doctor ||
    !department ||
    !report_type ||
    !report_id ||
    !age
  ) {
    return res.status(403).json({
      message: "Missing or invalid parameters for updating user information"
    });
  }

  try {
    const existingReport = await Report.findById({ _id: id });

    if (!existingReport) {
      return res.status(404).json({ message: "User not found" });
    }

    existingReport.status = "accepted";
    existingReport.date = date;
    existingReport.report_title = report_title;
    existingReport.patient_name = patient_name;
    existingReport.gender = gender;
    existingReport.preferred_doctor = preferred_doctor;
    existingReport.department = department;
    existingReport.report_type = report_type;
    existingReport.report_id = report_id;
    existingReport.age = age;
    existingReport.report_comment = report_comment;
    if (reportImg) {
      existingReport.report_image = reportImg;
    }

    // Save the updated user to the database
    await existingReport.save();

    res.status(200).json({
      success: `Report ${existingReport.name} updated successfully`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const RejectReportController = async (req, res) => {
  const { id } = req.body;
  try {
    const rejectReport = await Report.findOneAndDelete({ _id: id });
    res.json(rejectReport);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  AllHospitalsController,
  AllRequestedHospitalsController,
  AllRegisteredHospitalsController,
  NewHospitalAddController,
  UpdateHospitalController,
  addNewReportController,
  pendingReportController,
  allReportController,
  editReportController,
  RejectReportController,
  completeReportController
};
