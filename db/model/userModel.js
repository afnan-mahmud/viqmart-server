const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userModel);

module.exports = User;
