// External Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Internal Imports
const connectDB = require("./db/connectDB");
const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productRouter");
const handleError = require("./middlewares/common/handleError");

// variable
const port = process.env.PORT;

//Initialization
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// Router
app.use("/auth", authRouter);
app.use("/product", productRouter);

// 404 handler

// error handler
app.use(handleError);

// Run the server
app.listen(port, () => {
  console.log(`Server is listening from ${port}`);
});
