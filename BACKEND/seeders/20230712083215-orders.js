"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          users_orders_id: 2,
          address_orders_id: null,
          address_detail: "Phương Trung-Thanh Oai-Hà Nội",
          name_user: "Trịnh Hoàng Quân",
          email: "quanbk@gmail.com",
          phoneNumber: "0978872538",
          status: 1,
          note: null,
          date_order: null,
          createdAt: "2023-04-15 02:39:24",
          updatedAt: "2023-04-18 02:39:24",
        },
        {
          users_orders_id: 2,
          address_orders_id: null,
          address_detail: "Phương Trung-Thanh Oai-Hà Nội",
          name_user: "Nguyễn Thị Hằng",
          email: "quanbk@gmail.com",
          phoneNumber: "0978872538",
          status: 2,
          note: null,
          date_order: null,
          createdAt: "2023-05-16 02:39:24",
          updatedAt: "2023-05-18 02:39:24",
        },
        {
          users_orders_id: 2,
          address_orders_id: null,
          address_detail: "Phương Trung-Thanh Oai-Hà Nội",
          name_user: "Nguyễn Thị Hằng",
          email: "quanbk@gmail.com",
          phoneNumber: "0978872538",
          status: 3,
          note: null,
          date_order: null,
          createdAt: "2023-06-14 02:39:24",
          updatedAt: "2023-06-15 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
