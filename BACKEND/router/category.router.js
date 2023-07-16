const express = require("express");
const categoryRouter = express.Router();
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { allAuthorize, adminAuthorize } = require("../middleware/authorization");
const { authenticate } = require("../middleware/authentication");

categoryRouter.get("/get-all-category", getAllCategory);

categoryRouter.post(
  "/create-category",
  authenticate,
  adminAuthorize,
  createCategory
);

categoryRouter.put(
  "/update-category",
  authenticate,
  adminAuthorize,
  updateCategory
);

categoryRouter.delete(
  "/delete-category",
  authenticate,
  adminAuthorize,
  deleteCategory
);

module.exports = {
  categoryRouter,
};
