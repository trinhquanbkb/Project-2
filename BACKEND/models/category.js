"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products }) {
      this.hasMany(Products, { foreignKey: "cate_products_id" });
    }
  }
  Categories.init(
    {
      parent_id: DataTypes.INTEGER,
      name_category: DataTypes.STRING,
      href: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
