"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ District, Address, Country }) {
      this.hasMany(District, { foreignKey: "city_district_id" });
      this.hasMany(Address, { foreignKey: "city_address_id" });
      this.belongsTo(Country, { foreignKey: "country_city_id" });
    }
  }
  City.init(
    {
      city_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
