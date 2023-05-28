"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "countries",
          key: "id",
        },
      },
      city_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "cities",
          key: "id",
        },
      },
      district_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "districts",
          key: "id",
        },
      },
      ward_address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "wards",
          key: "id",
        },
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
    await queryInterface.dropTable("Addresses");
  },
};
