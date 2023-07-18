const express = require("express");
const { getAllSize } = require("../controller/size.controller");
const sizeRouter = express.Router();

sizeRouter.get("/get-all-size", getAllSize);

module.exports = {
  sizeRouter,
};
