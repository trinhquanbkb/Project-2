const express = require("express");
const { getAllBrand } = require("../controller/brand.controller");
const brandRouter = express.Router();

brandRouter.get("/get-all-brand", getAllBrand);

module.exports = {
  brandRouter,
};
