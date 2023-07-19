"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Address, Users, OrderDetail }) {
      this.belongsTo(Address, { foreignKey: "address_orders_id" });
      this.belongsTo(Users, { foreignKey: "users_orders_id" });
      this.hasMany(OrderDetail, { foreignKey: "orders_orderDetail_id" });
    }
  }
  Orders.init(
    {
      address_detail: DataTypes.TEXT,
      name_user: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      status: DataTypes.INTEGER,
      //status = 1: sản phẩm đã được đặt, đang chờ xử lý
      //status = 2: sản phẩm đã được duyệt, đang chờ giao hàng
      //status = 3: sản phẩm đã được nhận
      note: DataTypes.TEXT,
      date_order: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
