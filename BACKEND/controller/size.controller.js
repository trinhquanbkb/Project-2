const { Size } = require("../models");

const getAllSize = async (req, res) => {
  try {
    const sizes = await Size.findAll();
    //get category with parent_id is null
    if (sizes) {
      res.status(200).send(sizes);
    } else {
      throw new Error("Cannot get all size");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSize,
};
