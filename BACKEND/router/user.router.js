const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginAdmin,
  loginUser,
} = require("../controller/user.controller");

userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-admin", loginAdmin);

module.exports = {
  userRouter,
};
