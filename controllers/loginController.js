const User = require("../models/userModels");
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send({ error: "Please enter your email" });
  } else if (!password) {
    return res.send({ error: "Please enter your password" });
  } else {
    const isEmailExist = await User.find({ email: email });


    if (isEmailExist.length > 0) {
      bcrypt
        .compare(password, isEmailExist[0].password)
        .then(function (result) {
          if (result) {
            res.json({
              success: "Login successful",
              user: isEmailExist[0]
            });
          } else {
            return res.send({ error: "Password not matched" });
          }
        });
    } else {
      return res.send({ error: "Email not found" });
    }
  }
};

module.exports = loginController;
