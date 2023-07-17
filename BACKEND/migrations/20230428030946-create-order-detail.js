"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      products_orderDetail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      orders_orderDetail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      price: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.TEXT,
      },
      size: {
        type: Sequelize.TEXT,
      },
      count: {
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      status_order: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderDetails");
  },
};
