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
          createdAt: "2023-04-12 02:39:24",
          updatedAt: "2023-04-12 02:39:24",
        },
        {
          name_user: "Nguyễn Đức Toàn",
          address_users_id: null,
          avatar: null,
          phone_number: "0988677000",
          email: "hais@gmail.com",
          password:
            "$2a$10$HhxAfn0YQ64OP/pc/xCmxuBmV7S9RZAGLNy5eZARY3f7hB2hPnSde",
          role: "admin",
          isActive: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_user: "Đào Văn Hải",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "haibk1@gmail.com",
          password:
            "$2a$10$rxPJp6DvnL8U8yahWIU6Su.67b2gRREe5SnFdpHVTYirnCQSR0R5u",
          role: "user",
          isActive: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_user: "Ngô Bá Quốc",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "quocb1@gmail.com",
          password:
            "$2a$10$G.1Rt6FwbTwgu4Uv4xtVzu1IoLVbRY/1srm7iPMR6xEONC1Ac0kjG",
          role: "user",
          isActive: 1,
          createdAt: "2023-05-12 02:39:24",
          updatedAt: "2023-05-12 02:39:24",
        },
        {
          name_user: "Đào Đức Dương",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "duong1@gmail.com",
          password:
            "$2a$10$G.1Rt6FwbTwgu4Uv4xtVzu1IoLVbRY/1srm7iPMR6xEONC1Ac0kjG",
          role: "user",
          isActive: 1,
          createdAt: "2023-06-12 02:39:24",
          updatedAt: "2023-06-12 02:39:24",
        },
        {
          name_user: "Phạm Hải Như",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "nhuchib@gmail.com",
          password:
            "$2a$10$G.1Rt6FwbTwgu4Uv4xtVzu1IoLVbRY/1srm7iPMR6xEONC1Ac0kjG",
          role: "user",
          isActive: 1,
          createdAt: "2023-07-12 02:39:24",
          updatedAt: "2023-07-13 02:39:24",
        },
        {
          name_user: "Đặng Thị Thanh Nhã",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "nha125@gmail.com",
          password:
            "$2a$10$G.1Rt6FwbTwgu4Uv4xtVzu1IoLVbRY/1srm7iPMR6xEONC1Ac0kjG",
          role: "user",
          isActive: 1,
          createdAt: "2023-07-13 02:39:24",
          updatedAt: "2023-07-13 02:39:24",
        },
        {
          name_user: "Mai Danh Tài",
          address_users_id: null,
          avatar: null,
          phone_number: "0327393234",
          email: "taik4@gmail.com",
          password:
            "$2a$10$G.1Rt6FwbTwgu4Uv4xtVzu1IoLVbRY/1srm7iPMR6xEONC1Ac0kjG",
          role: "user",
          isActive: 1,
          createdAt: "2023-04-13 02:39:24",
          updatedAt: "2023-04-13 02:39:24",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
