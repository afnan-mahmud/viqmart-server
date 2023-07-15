// Internal Imports
const User = require("../db/model/userModel");

async function signUpcontroller(req, res, next) {
  const checkUser = await User.findOne({ email: req.body.email });

  if (checkUser) {
    return res.status(409).json({
      status: "failed",
      error: {
        message: "You are already registered, please login",
      },
    });
  } else {
    const newUser = new User({ ...req.body });
    try {
      await newUser.save();
      return res.status(201).json({
        status: "successfull",
        message: "Account registration successfull.",
      });
    } catch (err) {
      return res.status(500).json({
        status: "failed",
        error: {
          message: "There was a server side error, Try again...",
        },
      });
    }
  }
}

async function logIncontroller(req, res, next) {
  const checkUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (checkUser) {
    res.status(200).json({
      status: "successfull",
      message: "you are login successfully",
    });
  } else {
    res.status(401).json({
      status: "failed",
      error: {
        message: "Your email or password didn't match, please try again...",
      },
    });
  }
}
module.exports = {
  signUpcontroller,
  logIncontroller,
};
