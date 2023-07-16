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
} = require("../controller/product.controller");
const { authenticate } = require("../middleware/authentication");
const { allAuthorize, adminAuthorize } = require("../middleware/authorization");

productRouter.get("/get-all-product", getAllProduct);
productRouter.get("/get-all-product-sale", getSaleProduct);
productRouter.get("/get-new-product", getNewProduct);
productRouter.get("/get-product-by-cateid", getProductByCateId);
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
productRouter.delete(
  "/delete-product",
  authenticate,
  adminAuthorize,
  deleteProduct
);

module.exports = {
  productRouter,
};
