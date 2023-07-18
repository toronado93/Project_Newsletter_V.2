require("dotenv").config();

const mongoose = require("mongoose");

exports.Atlas_Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
