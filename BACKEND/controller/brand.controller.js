const { Brand } = require("../models");

const getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    if (brands) {
      res.status(200).send(brands);
    } else {
      throw new Error("Cannot get all brand");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllBrand,
};
