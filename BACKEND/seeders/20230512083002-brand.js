"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Brands",
      [
        {
          name_brand: "Izs closet",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_brand: "Recycle Active",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
