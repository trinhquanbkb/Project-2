"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tags, Products }) {
      this.belongsTo(Tags, { foreignKey: "tags_tagProduct_id" });
      this.belongsTo(Products, { foreignKey: "products_tagProduct_id" });
    }
  }
  TagProduct.init(
    {},
    {
      sequelize,
      modelName: "TagProduct",
    }
  );
  return TagProduct;
};
