const express = require("express");
const {
  createOrder,
  updateStatusOrder,
} = require("../controller/order.controller");
const orderRouter = express.Router();
const {
  adminAuthorize,
  userAuthorize,
  allAuthorize,
} = require("../middleware/authorization");
const { authenticate } = require("../middleware/authentication");

orderRouter.post(
  "/create-order-product",
  authenticate,
  userAuthorize,
  createOrder
);

orderRouter.put(
  "/update-status-order",
  authenticate,
  allAuthorize,
  updateStatusOrder
);

module.exports = {
  orderRouter,
};
