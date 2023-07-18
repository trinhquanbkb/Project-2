const express = require("express");
const rootRouter = express.Router();
const { userRouter } = require("./user.router");
const { productRouter } = require("./product.router");
const { categoryRouter } = require("./category.router");
const { orderDetailRouter } = require("./orderDetail.router");
const { sizeRouter } = require("./size.router");
const { brandRouter } = require("./brand.router");
const { colorRouter } = require("./color.router");

rootRouter.use("/users", userRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/orderDetails", orderDetailRouter);
rootRouter.use("/sizes", sizeRouter);
rootRouter.use("/brands", brandRouter);
rootRouter.use("/colors", colorRouter);

module.exports = {
  rootRouter,
};
