const { Products } = require("../models");

const getAllProduct = async (req, res) => {
  try {
    const products = await Products.findAll();
    if (products) {
      res.status(201).send(products);
    } else {
      throw new Error("Cannot get all product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllProduct,
};
