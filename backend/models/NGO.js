const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  typesAccepted: {
    type: [String],
    default: []
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("NGO", NGOSchema);
