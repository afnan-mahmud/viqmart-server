// External Imports
const express = require("express");

// Internal Imports
const {
  signUpcontroller,
  logIncontroller,
} = require("../controller/authController");

// make sign in router
const authRouter = express.Router();

//log in route
authRouter.post("/login", logIncontroller);

// sign up route
authRouter.post("/signup", signUpcontroller);

module.exports = authRouter;
