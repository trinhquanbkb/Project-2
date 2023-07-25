"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderDetails",
      [
        {
          user_id: 2,
          price: 637500,
          count: 5,
          color: "black",
          size: "XL",
          rating: null,
          comment: null,
          status_order: 1,
          products_orderDetail_id: 6,
          orders_orderDetail_id: 1,
          createdAt: "2023-04-15 02:39:24",
          updatedAt: "2023-04-15 02:39:24",
        },
        {
          user_id: 2,
          price: 800000,
          count: 4,
          color: "grey",
          size: "XL",
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 1,
          orders_orderDetail_id: null,
          createdAt: "2023-04-15 02:39:24",
          updatedAt: "2023-04-15 02:39:24",
        },
        {
          user_id: 2,
          price: 800000,
          count: 4,
          color: "grey",
          size: "XXXL",
          rating: null,
          comment: null,
          status_order: 1,
          products_orderDetail_id: 1,
          orders_orderDetail_id: 2,
          createdAt: "2023-05-16 02:39:24",
          updatedAt: "2023-05-16 02:39:24",
        },
        {
          user_id: 2,
          price: 546000,
          count: 3,
          color: "white",
          size: "XXL",
          rating: null,
          comment: null,
          status_order: 1,
          products_orderDetail_id: 3,
          orders_orderDetail_id: 2,
          createdAt: "2023-05-16 02:39:24",
          updatedAt: "2023-05-16 02:39:24",
        },
        {
          user_id: 2,
          price: 800000,
          count: 4,
          color: "grey",
          size: "XXXL",
          rating: null,
          comment: null,
          status_order: 1,
          products_orderDetail_id: 1,
          orders_orderDetail_id: 3,
          createdAt: "2023-06-14 02:39:24",
          updatedAt: "2023-06-14 02:39:24",
        },
        {
          user_id: 2,
          price: 560000,
          count: 2,
          color: "white",
          size: "XXXL",
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 4,
          orders_orderDetail_id: null,
          createdAt: "2023-06-14 02:39:24",
          updatedAt: "2023-06-14 02:39:24",
        },
        {
          user_id: 2,
          price: 738000,
          count: 2,
          color: "white",
          size: "XXL",
          rating: null,
          comment: null,
          status_order: null,
          products_orderDetail_id: 5,
          orders_orderDetail_id: null,
          createdAt: "2023-06-14 02:39:24",
          updatedAt: "2023-06-14 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
