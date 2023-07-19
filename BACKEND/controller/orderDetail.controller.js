const { OrderDetail } = require("../models");
const { sequelize } = require("../models/index");

//CRUD order detail
const getAllOrderDetail = async (req, res) => {
  const { userId } = req.user;
  try {
    const orderDetails = await OrderDetail.findAll({
      where: {
        user_id: userId,
        status_order: null,
      },
    });
    const [products, metadataProduct] = await sequelize.query(
      `SELECT products.id, products.name_product, products.price, products.percent_sale, products.remain, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id`
    );
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id;"
    );
    const [resultSize, metadataSize] = await sequelize.query(
      "SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id"
    );
    const [resultColor, metadataColor] = await sequelize.query(
      "SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id"
    );
    const [resultTag, metadataTag] = await sequelize.query(
      "SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id"
    );

    // gắn size vào product
    for (let i = 0; i < resultSize.length; i++) {
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultSize[i].id) {
          if (products[j].listSize == undefined) {
            products[j]["listSize"] = [];
            products[j]["listSize"].push(resultSize[i].size);
          } else {
            products[j]["listSize"].push(resultSize[i].size);
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultSize[i]);
        products[products.length - 1]["listSize"] = [
          ...products[products.length - 1].size,
        ];
        delete products[products.length - 1].size;
      }
    }

    //gắn color vào product
    for (let i = 0; i < resultColor.length; i++) {
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultColor[i].id) {
          if (products[j].listColor == undefined) {
            products[j]["listColor"] = [];
            products[j]["listColor"].push(resultColor[i].color);
          } else {
            products[j]["listColor"].push(resultColor[i].color);
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultColor[i]);
        products[products.length - 1]["listColor"] = [
          ...products[products.length - 1].color,
        ];
        delete products[products.length - 1].color;
      }
    }

    //gắn tags vào product
    for (let i = 0; i < resultTag.length; i++) {
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultTag[i].id) {
          if (products[j].listTag == undefined) {
            products[j]["listTag"] = [];
            products[j]["listTag"].push(resultTag[i].name_tag);
          } else {
            products[j]["listTag"].push(resultTag[i].name_tag);
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultTag[i]);
        products[products.length - 1]["listTag"] = [
          ...products[products.length - 1].name_tag,
        ];
        delete products[products.length - 1].name_tag;
      }
    }

    //gắn image vào product
    for (let i = 0; i < resultImage.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultImage[i].id) {
          if (products[j].listImage == undefined) {
            products[j]["listImage"] = [];
            products[j]["listImage"].push({
              url:
                "http://localhost:3000/product/" + resultImage[i].url + ".png",
              isMain: resultImage[i].isMain,
            });
          } else {
            products[j]["listImage"].push({
              url:
                "http://localhost:3000/product/" + resultImage[i].url + ".png",
              isMain: resultImage[i].isMain,
            });
          }
        }
      }
    }

    for (let j = 0; j < products.length; j++) {
      if (products[j].listSize == undefined) {
        products[j]["listSize"] = [];
      }
      if (products[j].listColor == undefined) {
        products[j]["listColor"] = [];
      }
      if (products[j].listTag == undefined) {
        products[j]["listTag"] = [];
      }
      if (products[j].listImage == undefined) {
        products[j]["listImage"] = [];
      }
    }

    let result = [];
    for (let i = 0; i < orderDetails.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (
          orderDetails[i].dataValues.products_orderDetail_id === products[j].id
        ) {
          result.push({
            id: orderDetails[i].dataValues.id,
            name_product: products[j].name_product,
            price: orderDetails[i].dataValues.price,
            color: orderDetails[i].dataValues.color,
            remain: products[j].remain,
            name_brand: products[j].name_brand,
            listImage: products[j].listImage,
            listSize: products[j].listSize,
            listColor: products[j].listColor,
            listTag: products[j].listTag,
            products_orderDetail_id: products[j].id,
            rating: orderDetails[i].dataValues.rating,
            status_order: orderDetails[i].dataValues.status_order,
            comment: orderDetails[i].dataValues.comment,
            size: orderDetails[i].dataValues.size,
            count: orderDetails[i].dataValues.count,
            user_id: orderDetails[i].dataValues.user_id,
            orders_orderDetail_id:
              orderDetails[i].dataValues.orders_orderDetail_id,
            createdAt: orderDetails[i].dataValues.createdAt,
            updatedAt: orderDetails[i].dataValues.updatedAt,
          });
        }
      }
    }
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      throw new Error("Cannot get all orderDetail");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createOrderDetail = async (req, res) => {
  const { userId } = req.user;
  const { product_id, price, count, color, size } = req.body;
  try {
    const listOrder = await OrderDetail.findAll({
      where: {
        user_id: userId,
      },
    });
    let x = 0;
    listOrder.forEach((item) => {
      if (
        item.dataValues.products_orderDetail_id == product_id &&
        item.dataValues.size == size &&
        item.dataValues.color == color &&
        item.dataValues.status_order === null
      ) {
        x++;
      }
    });
    if (x == 0) {
      const newOrder = await OrderDetail.create({
        user_id: userId,
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
    } else {
      const updateOrder = await OrderDetail.update(
        {
          price: price,
          count: count,
        },
        {
          where: {
            user_id: userId,
            products_orderDetail_id: product_id,
          },
        }
      );
      if (updateOrder) {
        res.status(201).send(updateOrder);
      } else {
        throw new Error("Cannot create new order detail");
      }
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

const getOrderManager = async (req, res) => {
  const { userId } = req.user;
  try {
    const [orders, metadataOrder] = await sequelize.query(
      `SELECT orderdetails.id, orders.status, orderdetails.count, imageproducts.url, orderdetails.user_id, orderdetails.products_orderDetail_id, orderdetails.color, orderdetails.size, orderdetails.rating , orderdetails.price, products.cate_products_id, products.name_product, products.percent_sale, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands, ecommerce_clothes.orderdetails, ecommerce_clothes.imageproducts, ecommerce_clothes.orders where products.brand_products_id = brands.id and orderdetails.status_order = 1 and orderdetails.products_orderDetail_id = products.id and imageproducts.product_imageProduct_id = orderdetails.products_orderDetail_id and imageproducts.isMain = 1 and orders.id = orderdetails.orders_orderDetail_id and orderdetails.user_id = ${userId}`
    );
    let result = [];
    orders.forEach((item) => {
      result.push({
        ...item,
        image: "http://localhost:3000/product/" + item.url + ".png",
      });
    });
    if (result) {
      res.status(200).send(result);
    } else {
      throw new Error("Cannot get order detail");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const ratingOrderDetail = async (req, res) => {
  const { id } = req.query;
  const { userId } = req.user;
  const { value } = req.body;
  try {
    const updateRating = await OrderDetail.update(
      {
        rating: value,
      },
      {
        where: {
          id: id,
          user_id: userId,
        },
      }
    );
    if (updateRating) {
      res.status(200).send("Update rating success");
    } else {
      throw new Error("Cannot update rating");
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
  getOrderManager,
  ratingOrderDetail,
};
