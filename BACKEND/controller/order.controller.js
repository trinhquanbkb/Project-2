const { Orders, OrderDetail } = require("../models");

const createOrder = async (req, res) => {
  const { userId } = req.user;
  const {
    users_orders_id,
    address_detail,
    name_user,
    email,
    phoneNumber,
    status,
    note,
    listOrderDetail,
  } = req.body;
  try {
    const order = await Orders.create({
      users_orders_id: userId,
      address_detail,
      name_user,
      email,
      phoneNumber,
      status,
      note,
    });
    listOrderDetail.forEach(async (item) => {
      let update = await OrderDetail.update(
        {
          price: item.price,
          orders_orderDetail_id: order.dataValues.id,
          status_order: 1,
          count: item.count,
        },
        {
          where: {
            id: item.id,
          },
        }
      );
      if (!update) {
        throw new Error("Cannot update order to orderDetail");
      }
    });
    if (order) {
      res.status(201).send(order);
    } else {
      throw new Error("Cannot create order product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStatusOrder = async (req, res) => {
  const { id } = req.query;
  try {
    const order = await Orders.findOne({
      where: {
        id: id,
      },
    });
    if (order.dataValues.status === 1) {
      await Orders.update(
        { status: 2 },
        {
          where: {
            id: id,
          },
        }
      );
    } else if (order.dataValues.status === 2) {
      await Orders.update(
        { status: 3 },
        {
          where: {
            id: id,
          },
        }
      );
    }
    if (order) {
      res.status(200).send("Update status order success");
    } else {
      throw new Error("Cannot update status order");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createOrder,
  updateStatusOrder,
};
