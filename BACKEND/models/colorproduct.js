"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ColorProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Color, Products }) {
      this.belongsTo(Color, { foreignKey: "color_colorProduct_id" });
      this.belongsTo(Products, { foreignKey: "products_colorProduct_id" });
    }
  }
  ColorProduct.init(
    {},
    {
      sequelize,
      modelName: "ColorProduct",
    }
  );
  return ColorProduct;
};
