const mongoose = require("mongoose");

const uploadProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
});

const Product = mongoose.model("product", uploadProductSchema);

module.exports = Product;
