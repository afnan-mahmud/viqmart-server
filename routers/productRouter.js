// External Imports
const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  uploadProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const multer = require("multer");
const path = require("path");

// file uploads folder
const UPLOADS_FOLDER = path.join(__dirname, "../uploads/productImages");

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, filename + fileExt);
  },
});

// final upload object
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, //1 mb
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg and .png format are allowed!"));
    }
  },
});

// Product Router
const productRouter = express.Router();

// Router
productRouter.get("/allproduct", getAllProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.post("/upload", upload.array("image", 5), uploadProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
