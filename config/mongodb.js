const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL).then(() => console.log("db is connected"));
  } catch (error) {
    console.log(err);
  }
};
module.exports = mongodb;
