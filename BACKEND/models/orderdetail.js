"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Products, Orders }) {
      this.belongsTo(Products, { foreignKey: "products_orderDetail_id" });
      this.belongsTo(Orders, { foreignKey: "orders_orderDetail_id" });
    }
  }
  OrderDetail.init(
    {
      price: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      status_order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
