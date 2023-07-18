"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cate_products_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      brand_products_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "brands",
          key: "id",
        },
      },
      material: {
        type: Sequelize.STRING,
      },
      name_product: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      percent_sale: {
        type: Sequelize.INTEGER,
      },
      remain: {
        type: Sequelize.INTEGER,
      },
      description_detail: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Products");
  },
};
