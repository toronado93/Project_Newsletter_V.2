const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    fieldId: {
      type: Number, // or mongoose.Schema.Types.ObjectId if you want to use ObjectId
      required: true,
    },
    fieldname: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model('Field', fieldSchema);