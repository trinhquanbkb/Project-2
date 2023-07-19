const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginAdmin,
  loginUser,
  getUserInfo,
} = require("../controller/user.controller");
const { authenticate } = require("../middleware/authentication");
const { allAuthorize } = require("../middleware/authorization");

userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-admin", loginAdmin);
userRouter.get("/get-user-info", authenticate, allAuthorize, getUserInfo);

module.exports = {
  userRouter,
};
