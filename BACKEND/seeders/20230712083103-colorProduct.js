"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ColorProducts",
      [
        {
          color_colorProduct_id: 4,
          products_colorProduct_id: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 1,
          products_colorProduct_id: 2,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 1,
          products_colorProduct_id: 3,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 1,
          products_colorProduct_id: 4,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 9,
          products_colorProduct_id: 5,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 2,
          products_colorProduct_id: 6,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 4,
          products_colorProduct_id: 7,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          color_colorProduct_id: 2,
          products_colorProduct_id: 8,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ColorProducts", null, {});
  },
};
