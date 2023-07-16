const express = require("express");
const rootRouter = express.Router();
const { userRouter } = require("./user.router");
const { productRouter } = require("./product.router");
const { categoryRouter } = require("./category.router");
const { orderDetailRouter } = require("./orderDetail.router");

rootRouter.use("/users", userRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/orderDetails", orderDetailRouter);

module.exports = {
  rootRouter,
};
