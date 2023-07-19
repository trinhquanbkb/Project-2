"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderDetails",
      [
        {
          user_id: 2,
          price: 120000,
          count: 1,
          color: "grey",
          size: null,
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 7,
          orders_orderDetail_id: null,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          user_id: 2,
          price: 150000,
          count: 5,
          color: "black",
          size: "XL",
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 6,
          orders_orderDetail_id: null,
          createdAt: "2023-05-14 02:39:24",
          updatedAt: "2023-05-14 02:39:24",
        },
        {
          user_id: 2,
          price: 250000,
          count: 4,
          color: "grey",
          size: "XL",
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 1,
          orders_orderDetail_id: null,
          createdAt: "2023-05-15 02:39:24",
          updatedAt: "2023-05-15 02:39:24",
        },
        {
          user_id: 2,
          price: 250000,
          count: 4,
          color: "grey",
          size: "XXXL",
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 1,
          orders_orderDetail_id: null,
          createdAt: "2023-05-16 02:39:24",
          updatedAt: "2023-05-16 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
