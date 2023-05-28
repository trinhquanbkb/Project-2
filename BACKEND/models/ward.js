"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ District, Address }) {
      this.belongsTo(District, { foreignKey: "district_ward_id" });
      this.hasMany(Address, { foreignKey: "ward_address_id" });
    }
  }
  Ward.init(
    {
      ward_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ward",
    }
  );
  return Ward;
};
