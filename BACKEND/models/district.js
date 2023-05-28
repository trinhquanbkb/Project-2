"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ward, Address, City }) {
      this.hasMany(Ward, { foreignKey: "district_ward_id" });
      this.hasMany(Address, { foreignKey: "district_address_id" });
      this.belongsTo(City, { foreignKey: "city_address_id" });
    }
  }
  District.init(
    {
      district_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "District",
    }
  );
  return District;
};
