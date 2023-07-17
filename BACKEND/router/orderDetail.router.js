const express = require("express");
const orderDetailRouter = express.Router();
const {
  adminAuthorize,
  userAuthorize,
  allAuthorize,
} = require("../middleware/authorization");
const { authenticate } = require("../middleware/authentication");
const {
  getAllOrderDetail,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
} = require("../controller/orderDetail.controller");

orderDetailRouter.get(
  "/get-all-order-detail",
  authenticate,
  userAuthorize,
  getAllOrderDetail
);

orderDetailRouter.post(
  "/create-order-detail",
  authenticate,
  userAuthorize,
  createOrderDetail
);

orderDetailRouter.put(
  "/update-order-detail",
  authenticate,
  adminAuthorize,
  updateOrderDetail
);

orderDetailRouter.delete(
  "/delete-order-detail",
  authenticate,
  userAuthorize,
  deleteOrderDetail
);

module.exports = {
  orderDetailRouter,
};
