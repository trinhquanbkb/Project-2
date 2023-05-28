"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TagProduct }) {
      this.hasMany(TagProduct, { foreignKey: "tags_tagProduct_id" });
    }
  }
  Tags.init(
    {
      name_tag: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tags",
    }
  );
  return Tags;
};
