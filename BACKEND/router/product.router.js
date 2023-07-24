const express = require("express");
const productRouter = express.Router();
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSaleProduct,
  getNewProduct,
  getProductByCateId,
  getProductByName,
  uploadImageProduct,
  getAtrrProduct,
} = require("../controller/product.controller");
const { authenticate } = require("../middleware/authentication");
const { allAuthorize, adminAuthorize } = require("../middleware/authorization");
const { uploadImage } = require("../middleware/uploadImage");

productRouter.get("/get-all-product", getAllProduct);
productRouter.get("/get-all-product-sale", getSaleProduct);
productRouter.get("/get-new-product", getNewProduct);
productRouter.get("/get-product-by-cateid", getProductByCateId);
productRouter.get("/get-product-by-name", getProductByName);
productRouter.post(
  "/upload-image-product",
  authenticate,
  adminAuthorize,
  uploadImage(),
  uploadImageProduct
);
productRouter.post(
  "/create-product",
  authenticate,
  adminAuthorize,
  createProduct
);
productRouter.put(
  "/update-product",
  authenticate,
  adminAuthorize,
  updateProduct
);
productRouter.get("/get-all-attr", getAtrrProduct);
productRouter.put(
  "/delete-product",
  authenticate,
  adminAuthorize,
  deleteProduct
);

module.exports = {
  productRouter,
};
