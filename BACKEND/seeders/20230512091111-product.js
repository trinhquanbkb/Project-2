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
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 250000,
          percent_sale: 20,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 258,
          createdAt: "2023-03-12 02:39:24",
          updatedAt: "2023-03-12 02:39:24",
        },
        {
          cate_products_id: 14,
          brand_products_id: 1,
          name_product: "Áo thun Supima cotton",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 200000,
          percent_sale: 32,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 854,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-15 02:39:24",
        },
        {
          cate_products_id: 14,
          brand_products_id: 1,
          name_product: "Áo thun dáng rộng ngắn tay Bolovia",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 280000,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          percent_sale: 35,
          remain: 432,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-18 02:39:24",
        },
        {
          cate_products_id: 33,
          brand_products_id: 1,
          name_product: "Quần nỉ siêu co dãn dry",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 350000,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          percent_sale: 20,
          remain: 78,
          createdAt: "2023-04-02 02:39:24",
          updatedAt: "2023-04-02 02:39:24",
        },
        {
          cate_products_id: 31,
          brand_products_id: 1,
          name_product: "Quần bò bolovia dài",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 410000,
          percent_sale: 10,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 85,
          createdAt: "2023-05-02 02:39:24",
          updatedAt: "2023-05-08 02:39:24",
        },
        {
          cate_products_id: 32,
          brand_products_id: 1,
          name_product: "Quần cộc",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 150000,
          percent_sale: 15,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 85,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-23 02:39:24",
        },
        {
          cate_products_id: 47,
          brand_products_id: 1,
          name_product: "Mũ/Nón lưỡi trai nam Classic Cap thêu logo",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 120000,
          percent_sale: null,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 85,
          createdAt: "2023-05-14 02:39:24",
          updatedAt: "2023-05-19 02:39:24",
        },
        {
          cate_products_id: 48,
          brand_products_id: 1,
          name_product: "Combo 3 đôi tất/vớ cổ dài Cotton",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 90000,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          percent_sale: 30,
          remain: 85,
          createdAt: "2023-05-19 02:39:24",
          updatedAt: "2023-05-19 02:39:25",
        },
        {
          cate_products_id: 8,
          brand_products_id: 2,
          name_product: "Áo thun Recycle Active",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 260000,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          percent_sale: null,
          remain: 15,
          createdAt: "2023-05-22 02:39:24",
          updatedAt: "2023-05-23 02:39:25",
        },
        {
          cate_products_id: 8,
          brand_products_id: 2,
          name_product: "Áo thun thể thao dài tay nam Recycle Active",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 180000,
          percent_sale: 10,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 15,
          createdAt: "2023-05-22 02:39:24",
          updatedAt: "2023-05-23 02:39:28",
        },
        {
          cate_products_id: 47,
          brand_products_id: 1,
          name_product: "Mũ/Nón Bucket Hat thêu Care",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 120000,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          percent_sale: null,
          remain: 7,
          createdAt: "2023-05-22 02:39:24",
          updatedAt: "2023-05-25 02:39:28",
        },
        {
          cate_products_id: 22,
          brand_products_id: 1,
          name_product: "Áo Thun Vải Slub Jersey Dáng Ngắn Ngắn Tay",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 220000,
          percent_sale: null,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          remain: 7,
          createdAt: "2023-02-21 02:39:24",
          updatedAt: "2023-02-22 02:39:28",
        },
        {
          cate_products_id: 22,
          brand_products_id: 1,
          name_product: "Áo Thun Gân Kẻ Sọc Cổ Tròn Tay Lỡ",
          description_detail:
            '<p>- Đường viền đan thoáng khí.</p><p>- Chống tia cực tím.</p><p>- Công nghệ "DRY-EX" khô nhanh.</p><p>- Được làm bằng vải siêu co giãn.</p><p>- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p>- Túi bên có khóa kéo.</p>',
          price: 200000,
          material:
            "<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste",
          percent_sale: null,
          remain: 27,
          createdAt: "2023-02-21 02:39:24",
          updatedAt: "2023-02-25 02:39:28",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
