const mongoose = require("mongoose");
require("dotenv").config();
const url = `mongodb+srv://afnanmahmud_fa:${process.env.DB_PASSWORD}@viqmartcluster.1io5cuy.mongodb.net/userInfo?retryWrites=true&w=majority`;

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
