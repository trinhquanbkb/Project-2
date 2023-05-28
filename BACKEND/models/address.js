"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Country, City, District, Ward, Users, Orders }) {
      this.belongsTo(Country, { foreignKey: "country_address_id" });
      this.belongsTo(City, { foreignKey: "city_address_id" });
      this.belongsTo(District, { foreignKey: "district_address_id" });
      this.belongsTo(Ward, { foreignKey: "ward_address_id" });
      this.hasMany(Users, { foreignKey: "address_users_id" });
      this.hasMany(Orders, { foreignKey: "address_orders_id" });
    }
  }
  Address.init(
    {},
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
