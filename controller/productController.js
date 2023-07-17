// External Imports
const path = require("path");

// Internal Imports
const Product = require("../db/model/uploadProductModel");

async function getAllProducts(req, res, next) {
  try {
    const allProduct = await Product.find().select("-__v");
    res.status(200).json({
      status: "successfull",
      total: allProduct.length,
      data: allProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: {
        message: "Internal server error!",
      },
    });
  }
}

async function getSingleProduct(req, res, next) {
  try {
    const singleProduct = await Product.find({ _id: req.params.id }).select(
      "-__v"
    );
    res.status(200).json({
      status: "successfull",
      total: singleProduct.length,
      data: singleProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: {
        message: "Internal server error!",
      },
    });
  }
}

async function uploadProduct(req, res, next) {
  try {
    const images = req.files.map((item) => {
      const image = item.path;
      const relativeUrl = path.relative(__dirname, image);
      return "/" + relativeUrl;
    });

    const newProduct = new Product({ ...req.body, image: images });
    await newProduct.save();
    return res.status(201).json({
      status: "successfull",
      message: "Product successfully uploaded.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: {
        message: "Product uploading failed, Try again...",
      },
    });
  }
}

async function updateProduct(req, res, next) {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "failed",
        error: {
          message: "Product not found.",
        },
      });
    }

    return res.status(200).json({
      status: "successfull",
      data: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: failed,
      error: {
        message: "There was a server side error.",
      },
    });
  }
}

async function deleteProduct(req, res, next) {
  const productId = req.params.id;

  try {
    const deleteProduct = Product.findOneAndDelete({ _id: productId });

    if (!deleteProduct) {
      return res.status(404).json({
        status: "failed",
        error: {
          message: "Product not found",
        },
      });
    }

    return res.status(200).json({
      status: "successfull",
      message: "Product deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      error: {
        message: "There was a server problem.",
      },
    });
  }
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  uploadProduct,
  updateProduct,
  deleteProduct,
};
