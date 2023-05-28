const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginAdmin,
  loginUser,
} = require("../controller/user.controller");

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.post("/loginAdmin", loginAdmin);

module.exports = {
  userRouter,
};
