"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TagProducts",
      [
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 2,
          products_tagProduct_id: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 4,
          products_tagProduct_id: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 2,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 3,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 5,
          products_tagProduct_id: 3,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 5,
          products_tagProduct_id: 4,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 9,
          products_tagProduct_id: 5,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 9,
          products_tagProduct_id: 6,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 9,
          products_tagProduct_id: 6,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 10,
          products_tagProduct_id: 8,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 6,
          products_tagProduct_id: 8,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 9,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 2,
          products_tagProduct_id: 9,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 5,
          products_tagProduct_id: 9,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 10,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 2,
          products_tagProduct_id: 10,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 12,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 2,
          products_tagProduct_id: 12,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 1,
          products_tagProduct_id: 13,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          tags_tagProduct_id: 2,
          products_tagProduct_id: 13,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TagProducts", null, {});
  },
};
