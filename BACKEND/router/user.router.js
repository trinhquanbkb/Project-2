const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginAdmin,
  loginUser,
  getUserInfo,
  getCharUser,
} = require("../controller/user.controller");
const { authenticate } = require("../middleware/authentication");
const { allAuthorize, adminAuthorize } = require("../middleware/authorization");

userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-admin", loginAdmin);
userRouter.get("/get-user-info", authenticate, allAuthorize, getUserInfo);
userRouter.get("/get-chart-user", authenticate, adminAuthorize, getCharUser);

module.exports = {
  userRouter,
};
