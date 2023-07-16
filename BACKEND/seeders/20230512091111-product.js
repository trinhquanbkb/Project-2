"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          cate_products_id: 14,
          brand_products_id: 1,
          name_product: "Áo thun cổ tròn ngắn tay",
          description_detail: null,
          price: 250000,
          percent_sale: 20,
          remain: 258,
          createdAt: "2023-03-12 02:39:24",
          updatedAt: "2023-03-12 02:39:24",
        },
        {
          cate_products_id: 14,
          brand_products_id: 1,
          name_product: "Áo thun Supima cotton",
          description_detail: null,
          price: 200000,
          percent_sale: 32,
          remain: 854,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-15 02:39:24",
        },
        {
          cate_products_id: 14,
          brand_products_id: 1,
          name_product: "Áo thun dáng rộng ngắn tay Bolovia",
          description_detail: null,
          price: 280000,
          percent_sale: 35,
          remain: 432,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-18 02:39:24",
        },
        {
          cate_products_id: 33,
          brand_products_id: 1,
          name_product: "Quần nỉ siêu co dãn dry",
          description_detail: null,
          price: 350000,
          percent_sale: 20,
          remain: 78,
          createdAt: "2023-04-02 02:39:24",
          updatedAt: "2023-04-02 02:39:24",
        },
        {
          cate_products_id: 31,
          brand_products_id: 1,
          name_product: "Quần bò bolovia dài",
          description_detail: null,
          price: 410000,
          percent_sale: 10,
          remain: 85,
          createdAt: "2023-05-02 02:39:24",
          updatedAt: "2023-05-08 02:39:24",
        },
        {
          cate_products_id: 32,
          brand_products_id: 1,
          name_product: "Quần cộc",
          description_detail: null,
          price: 150000,
          percent_sale: 15,
          remain: 85,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-23 02:39:24",
        },
        {
          cate_products_id: 44,
          brand_products_id: 1,
          name_product: "Mũ/Nón lưỡi trai nam Classic Cap thêu logo",
          description_detail: null,
          price: 120000,
          percent_sale: null,
          remain: 85,
          createdAt: "2023-05-14 02:39:24",
          updatedAt: "2023-05-19 02:39:24",
        },
        {
          cate_products_id: 48,
          brand_products_id: 1,
          name_product: "Combo 3 đôi tất/vớ cổ dài Cotton",
          description_detail: null,
          price: 90000,
          percent_sale: 30,
          remain: 85,
          createdAt: "2023-05-19 02:39:24",
          updatedAt: "2023-05-19 02:39:25",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
