const express = require("express");
const { createOrder } = require("../controller/order.controller");
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

module.exports = {
  orderRouter,
};
