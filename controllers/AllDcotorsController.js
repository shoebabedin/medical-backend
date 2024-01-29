const Doctors = require("../models/userModels");
const bcrypt = require("bcryptjs");

// all doctor list models
const AllDcotorsController = async (req, res) => {
  const doctors = await Doctors.find({ role: "doctor" });

  res.json(doctors);
};

// all requested doctors
const AllRequestedDcotorsController = async (req, res) => {
  const doctors = await Doctors.find({ role: "doctor", status: "pending" });

  res.json(doctors);
};

// all registered doctors
const AllRegisteredDcotorsController = async (req, res) => {
  const doctors = await Doctors.find({ role: "doctor", status: "accepted" });

  res.json(doctors);
};

// all registered doctors
const NewDcotorsAddController = async (req, res) => {
  const { name, email, password, phone, h_name, position, bmdcRegNo, degrees } =
    req.body;

  const profileImgPath = req.files.profile_img
    ? req.files.profile_img[0].path +
      "." +
      req.files.profile_img[0].originalname.split(".").pop()
    : null;
  const doctorSignPath = req.files.doctor_sign
    ? req.files.doctor_sign[0].path +
      "." +
      req.files.doctor_sign[0].originalname.split(".").pop()
    : null;

  if (!name) {
    return res.status(403).json({ message: "Please enter your Name" });
  } else if (!email) {
    return res.status(403).json({ message: "Please enter your Email" });
  } else if (!password) {
    return res.status(403).json({ message: "Please enter your Password" });
  } else if (!phone) {
    return res.status(403).json({ message: "Please enter your Phone" });
  } else if (!h_name) {
    return res
      .status(403)
      .json({ message: "Please enter a valid Hospital Name" });
  } else if (!position) {
    return res.status(403).json({ message: "Please enter a valid Position" });
  } else if (!bmdcRegNo) {
    return res
      .status(403)
      .json({ message: "Please enter a valid BMDC registration number" });
  } else if (!profileImgPath) {
    return res.status(403).json({ message: "Please provide a Profile Image" });
  } else if (!doctorSignPath) {
    return res.status(403).json({ message: "Please provide a Doctor's Sign" });
  } else if (!degrees || degrees.length === 0) {
    return res
      .status(403)
      .json({ message: "Please provide at least one degree" });
  } else {
    const duplicate = await Doctors.find({ email: email });

    if (duplicate.length > 0) {
      return res.status(403).json({ message: "Duplicate Name" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = await Doctors({
        role: "doctor",
        name,
        email,
        password: hash,
        phone,
        h_name,
        position,
        bmdcRegNo,
        profile_img: profileImgPath,
        doctor_sign: doctorSignPath,
        degrees: JSON.parse(degrees)
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

const UpdateController = async (req, res) => {
  const { id, name, email, phone, h_name, position, bmdcRegNo, degrees } = req.body;

  const profileImgPath = req.files.profile_img
    ? req.files.profile_img[0].path +
      "." +
      req.files.profile_img[0].originalname.split(".").pop()
    : null;

  const doctorSignPath = req.files.doctor_sign
    ? req.files.doctor_sign[0].path +
      "." +
      req.files.doctor_sign[0].originalname.split(".").pop()
    : null;

  if (!name || !email || !phone || !h_name || !position || !bmdcRegNo || !id) {
    return res.status(403).json({
      message: "Missing or invalid parameters for updating user information",
    });
  }

  try {
    const existingUser = await Doctors.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the existing user's information
    existingUser.name = name;
    existingUser.email = email;
    existingUser.phone = phone;
    existingUser.h_name = h_name;
    existingUser.position = position;
    existingUser.bmdcRegNo = bmdcRegNo;

    // Only update the profile_img if it exists
    if (profileImgPath) {
      existingUser.profile_img = profileImgPath;
    }

    // Only update the doctor_sign if it exists
    if (doctorSignPath) {
      existingUser.doctor_sign = doctorSignPath;
    }

    existingUser.degrees = JSON.parse(degrees);

    // Save the updated user to the database
    await existingUser.save();

    res.status(200).json({
      success: `User ${existingUser.name} updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  AllDcotorsController,
  AllRequestedDcotorsController,
  AllRegisteredDcotorsController,
  NewDcotorsAddController,
  UpdateController
};
