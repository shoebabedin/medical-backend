const User = require("../models/userModels");

const AllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const AllUserPendingController = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: "pending" });
    res.json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).send("Internal Server Error");
  }
};
const ApproveController = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const approveUsers = await User.findOneAndUpdate(
      { _id: id },
      { status: "accepted" },
      { new: true } // To return the modified document
    );

    res.json(approveUsers);
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const RejectController = async (req, res) => {
  const {id} = req.body;
  console.log(id);
  try {
    const rejectUsers = await User.findOneAndDelete({ _id: id });
    res.json(rejectUsers);npm
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  AllUsersController,
  AllUserPendingController,
  ApproveController,
  RejectController,
};
