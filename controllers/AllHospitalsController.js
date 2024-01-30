const User = require("../models/userModels");
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

module.exports = {
  AllHospitalsController,
  AllRequestedHospitalsController,
  AllRegisteredHospitalsController,
  NewHospitalAddController,
  UpdateHospitalController
};
