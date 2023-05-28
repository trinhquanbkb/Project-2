"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ City, Address }) {
      this.hasMany(City, { foreignKey: "country_city_id" });
      this.hasMany(Address, { foreignKey: "country_address_id" });
    }
  }
  Country.init(
    {
      country_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Country",
    }
  );
  return Country;
};
