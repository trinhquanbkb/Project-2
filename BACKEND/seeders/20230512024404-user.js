"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name_user: "John Doe",
          address_users_id: null,
          avatar: null,
          phone_number: "0325847985",
          email: "lapbk@gmail.com",
          password:
            "$2a$10$HhxAfn0YQ64OP/pc/xCmxuBmV7S9RZAGLNy5eZARY3f7hB2hPnSde",
          role: "user",
          isActive: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_user: "Trịnh Hoàng Quân",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "quanbk@gmail.com",
          password:
            "$2a$10$V6N7rwjajdCHI04la0z1r.oq9gZNGIYgdNtD/dIaK17vTMmSZl4TS",
          role: "user",
          isActive: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_user: "Nguyễn Văn Hải",
          address_users_id: null,
          avatar: null,
          phone_number: "0988677000",
          email: "hais@gmail.com",
          password:
            "$2a$10$HhxAfn0YQ64OP/pc/xCmxuBmV7S9RZAGLNy5eZARY3f7hB2hPnSde",
          role: "user",
          isActive: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
