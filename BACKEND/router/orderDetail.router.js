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
  getOrderManager,
  ratingOrderDetail,
  getAllOrderDetailAdmin,
} = require("../controller/orderDetail.controller");

orderDetailRouter.get(
  "/get-all-order-detail",
  authenticate,
  userAuthorize,
  getAllOrderDetail
);

orderDetailRouter.get(
  "/get-all-order-detail-admin",
  authenticate,
  adminAuthorize,
  getAllOrderDetailAdmin
);

orderDetailRouter.get(
  "/get-order-detail-manager",
  authenticate,
  userAuthorize,
  getOrderManager
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

orderDetailRouter.put(
  "/update-order-detail-rating",
  authenticate,
  userAuthorize,
  ratingOrderDetail
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
