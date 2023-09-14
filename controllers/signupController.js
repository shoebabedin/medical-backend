
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

const signupController = async (req, res) => {
  const { role, name, email, password } = req.body;

  if (!role) {
    return res.status(403).json({ message: "please enter your Role" });
  } else if (!name) {
    return res.status(403).json({ message: "please enter your name" });
  } else if (!email) {
    return res.status(403).json({ message: "please enter your email" });
  } else if (!password) {
    return res.status(403).json({ message: "please enter your password" });
  } else {
    const duplicate = await User.find({ email: email });

    if (duplicate.length > 0) {
      return res.status(403).json({ message: "Duplicate Name" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = await User({
        role,
        name,
        email,
        password: hash
      });
      user.save()
      if (user) {
        res.status(200).json({ success: `New user ${user.name} created` });
      } else {
        res.status(400).json({ message: `Invalid user data received` });
      }
    });


  }
};

module.exports = signupController;
