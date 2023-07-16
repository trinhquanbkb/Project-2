"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SizeProducts",
      [
        {
          size_sizeProduct_id: 18,
          products_sizeProduct_id: 1,
          quality: 124,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 19,
          products_sizeProduct_id: 1,
          quality: 235,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 20,
          products_sizeProduct_id: 1,
          quality: 45,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 21,
          products_sizeProduct_id: 1,
          quality: 95,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 22,
          products_sizeProduct_id: 1,
          quality: 421,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 19,
          products_sizeProduct_id: 2,
          quality: 235,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 20,
          products_sizeProduct_id: 2,
          quality: 74,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 21,
          products_sizeProduct_id: 2,
          quality: 77,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 22,
          products_sizeProduct_id: 2,
          quality: 3,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 23,
          products_sizeProduct_id: 2,
          quality: 71,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 18,
          products_sizeProduct_id: 3,
          quality: 25,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          size_sizeProduct_id: 21,
          products_sizeProduct_id: 3,
          quality: 10,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SizeProducts", null, {});
  },
};