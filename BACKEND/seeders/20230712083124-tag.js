"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tags",
      [
        {
          name_tag: "áo thun",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "áo nam",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "áo nữ",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "Advanced Fast & Free Run",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "thể thao",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "tất chống trơn",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "Slub Jersey",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "Recycle Active",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "quần",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_tag: "combo",
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
