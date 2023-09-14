const User = require("../models/userModels");

const UsersController = async (req, res) => {
  let users = await User.find({});

  res.json(users);
};

module.exports = UsersController;
