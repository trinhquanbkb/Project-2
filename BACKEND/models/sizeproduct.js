"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SizeProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Size, Products }) {
      this.belongsTo(Size, { foreignKey: "size_sizeProduct_id" });
      this.belongsTo(Products, { foreignKey: "products_sizeProduct_id" });
    }
  }
  SizeProduct.init(
    {
      quality: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SizeProduct",
    }
  );
  return SizeProduct;
};
