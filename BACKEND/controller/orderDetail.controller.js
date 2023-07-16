const { OrderDetail } = require("../models");

//CRUD order detail
const getAllOrderDetail = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    if (orderDetails) {
      res.status(200).send(orderDetails);
    } else {
      throw new Error("Cannot get all orderDetail");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createOrderDetail = async (req, res) => {
  const { product_id, price, count, color, size } = req.body;
  try {
    const newOrder = await OrderDetail.create({
      products_orderDetail_id: product_id,
      price: price,
      count: count,
      color: color,
      size: size,
    });
    if (newOrder) {
      res.status(201).send(newOrder);
    } else {
      throw new Error("Cannot create new order detail");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateOrderDetail = async (req, res) => {
  const { count, color, size } = req.body;
  const { id } = req.query;
  try {
    const updateOrder = await OrderDetail.update(
      {
        count,
        color,
        size,
      },
      {
        where: {
          id,
        },
      }
    );
    if (updateOrder) {
      res.status(201).send(`Success update order detail id = ${id}`);
    } else {
      throw new Error("Cannot update order detail");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOrderDetail = async (req, res) => {
  const { id } = req.query;
  try {
    const orderDelete = await OrderDetail.destroy({
      where: {
        id,
      },
    });
    if (orderDelete) {
      res.status(200).send(`Success delete order detail id = ${id}`);
    } else {
      throw new Error("Cannot delete order detail");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllOrderDetail,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
