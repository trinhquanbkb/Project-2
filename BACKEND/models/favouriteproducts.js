"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FavouriteProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Products }) {
      this.belongsTo(Users, { foreignKey: "users_favouriteProducts_id" });
      this.belongsTo(Products, { foreignKey: "products_favouriteProducts_id" });
    }
  }
  FavouriteProducts.init(
    {},
    {
      sequelize,
      modelName: "FavouriteProducts",
    }
  );
  return FavouriteProducts;
};
