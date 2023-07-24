const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  }
  , fieldId: {
    type: Number,
    ref: 'Field', // Reference to the 'fields' collection
  },
});

module.exports = mongoose.model("User", userSchema);
