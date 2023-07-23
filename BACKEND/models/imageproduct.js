"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products }) {
      this.belongsTo(Products, { foreignKey: "product_imageProduct_id" });
    }
  }
  ImageProduct.init(
    {
      url: DataTypes.STRING,
      isMain: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ImageProduct",
    }
  );
  return ImageProduct;
};
