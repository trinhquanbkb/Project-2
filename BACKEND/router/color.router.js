const express = require("express");
const { getAllColor } = require("../controller/color.controller");
const colorRouter = express.Router();

colorRouter.get("/get-all-color", getAllColor);

module.exports = {
  colorRouter,
};
