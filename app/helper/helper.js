"use strict";
const multer = require("multer");
var randomstring = require("randomstring");

const images = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/stand_images");
    // path: "/stand_images",);
  },
  filename: (req, file, cb) => {
    let originaExt =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    let newFilename = randomstring.generate(20) + "." + originaExt;
    cb(null, newFilename);
  },
});
const product = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/product");
    // path: "/stand_images",);
  },
  filename: (req, file, cb) => {
    let originaExt =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    let newFilename = randomstring.generate(20) + "." + originaExt;
    cb(null, newFilename);
  },
});
const files = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/stand_files");
  },
  filename: (req, file, cb) => {
    let originaExt =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    let newFilename = randomstring.generate(20) + "." + originaExt;
    cb(null, newFilename);
  },
});
const productfilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/x-pdf" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/wmv"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const imgfilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/wmv"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const filefilter = (req, res, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/x-pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImages = multer({
  storage: images,
  fileFilter: imgfilter,
});
const uploadFiles = multer({ storage: files, fileFilter: productfilter });
const uploadProduct = multer({ storage: product, fileFilter: productfilter });

module.exports = { uploadImages, uploadFiles, uploadProduct };
