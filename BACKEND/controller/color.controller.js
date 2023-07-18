const { Color } = require("../models");

const getAllColor = async (req, res) => {
  try {
    const colors = await Color.findAll();
    if (colors) {
      res.status(200).send(colors);
    } else {
      throw new Error("Cannot get all color");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllColor,
};
