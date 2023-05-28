"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          cate_products_id: 8,
          brand_products_id: null,
          name_product: "Áo thun cổ tròn ngắn tay",
          description_detail: null,
          price: 250000,
          percent_sale: null,
          salient_feature: null,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          cate_products_id: 8,
          brand_products_id: null,
          name_product: "Áo thun Supima cotton",
          description_detail: null,
          price: 200000,
          percent_sale: null,
          salient_feature: null,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          cate_products_id: 8,
          brand_products_id: null,
          name_product: "Áo thun dáng rộng ngắn tay Bolovia",
          description_detail: null,
          price: 280000,
          percent_sale: null,
          salient_feature: null,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          cate_products_id: 27,
          brand_products_id: null,
          name_product: "Quần nỉ siêu co dãn dry",
          description_detail: null,
          price: 350000,
          percent_sale: null,
          salient_feature: null,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          cate_products_id: 27,
          brand_products_id: null,
          name_product: "Quần nỉ bolovia dài",
          description_detail: null,
          price: 410000,
          percent_sale: null,
          salient_feature: null,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
