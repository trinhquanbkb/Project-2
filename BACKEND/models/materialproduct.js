"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaterialProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Material, Products }) {
      this.belongsTo(Material, { foreignKey: "material_materialProduct_id" });
      this.belongsTo(Products, { foreignKey: "products_materialProduct_id" });
    }
  }
  MaterialProduct.init(
    {},
    {
      sequelize,
      modelName: "MaterialProduct",
    }
  );
  return MaterialProduct;
};
