const express = require("express");
const rootRouter = express.Router();
const { userRouter } = require("./user.router");

rootRouter.use("/users", userRouter);

module.exports = {
  rootRouter,
};
