"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Address, Orders, FavouriteProducts }) {
      this.belongsTo(Address, { foreignKey: "address_users_id" });
      this.hasMany(Orders, { foreignKey: "users_orders_id" });
      this.hasMany(FavouriteProducts, {
        foreignKey: "users_favouriteProducts_id",
      });
    }
  }
  Users.init(
    {
      name_user: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isActive: DataTypes.INTEGER, //isActive cho biết người dùng còn tồn tại sẽ là 1 và 0 nếu không tồn tại trong hệ thống nữa
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
