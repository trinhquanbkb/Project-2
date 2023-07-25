const { Op } = require("sequelize");
const {
  Products,
  ImageProduct,
  Size,
  SizeProduct,
  Tags,
  TagProduct,
  Color,
  ColorProduct,
  Categories,
  Brand,
} = require("../models");
const { sequelize } = require("../models/index");

//CRUD product
const getAllProduct = async (req, res) => {
  try {
    let [products, metadataProduct] = await sequelize.query(
      "SELECT products.id, products.material, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.isDelete = 0"
    );
    const [resultSize, metadataSize] = await sequelize.query(
      "SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.isDelete = 0"
    );
    const [resultColor, metadataColor] = await sequelize.query(
      "SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.isDelete = 0"
    );
    const [resultTag, metadataTag] = await sequelize.query(
      "SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.isDelete = 0"
    );
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.isDelete = 0"
    );
    const [resultOrder, metadataOrder] = await sequelize.query(
      "SELECT products.id, orderdetails.count, orderdetails.rating FROM ecommerce_clothes.orders, ecommerce_clothes.orderdetails, ecommerce_clothes.products WHERE orderdetails.products_orderDetail_id = products.id and orders.status = 3 and orderdetails.orders_orderDetail_id = orders.id;"
    );

    const mergedOrders = resultOrder.reduce((acc, order) => {
      const existingOrder = acc.find((item) => item.id === order.id);
      if (!existingOrder) {
        acc.push({ ...order });
      } else {
        existingOrder.count += order.count;
        if (order.rating !== null) {
          existingOrder.rating = existingOrder.rating || 0;
          existingOrder.rating = (existingOrder.rating + order.rating) / 2;
        }
      }
      return acc;
    }, []);

    products = products.map((item) => {
      const { id } = item;
      const foundItem = mergedOrders.find((resultItem) => resultItem.id === id);

      if (foundItem) {
        return {
          ...item,
          sold: foundItem.count,
          rating: foundItem.rating,
        };
      } else {
        return {
          ...item,
          sold: null,
          rating: null,
        };
      }
    });

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
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultImage[i].id) {
          if (products[j].listImage == undefined) {
            products[j]["listImage"] = [];
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          } else {
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url,
            isMain: products[products.length - 1].isMain,
          },
        ];
        delete products[products.length - 1].url;
        delete products[products.length - 1].isMain;
      }
    }

    // gắn brand
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

    if (products.length !== 0) {
      res.status(200).send(products);
    } else {
      throw new Error("Cannot get all product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createProduct = async (req, res) => {
  const {
    name_product,
    description_detail,
    price,
    percent_sale,
    cate_products_id,
    remain,
    material,
    brand,
    listColor,
    listSize,
    listTag,
  } = req.body;
  try {
    let sale;
    if (percent_sale === 0 || percent_sale === undefined) {
      sale = null;
    } else {
      sale = percent_sale;
    }
    const newProduct = await Products.create({
      name_product,
      description_detail,
      price,
      percent_sale: sale,
      cate_products_id,
      remain,
      material,
      isDelete: 0,
    });
    //create infor
    if (newProduct.dataValues.id) {
      // brand
      const createBrand = await Brand.create({
        name_brand: brand,
      });
      const updateProduct = await Products.update(
        { brand_products_id: createBrand.dataValues.id },
        {
          where: {
            id: newProduct.dataValues.id,
          },
        }
      );
      listColor.forEach(async (item) => {
        const updateColor = await ColorProduct.create({
          color_colorProduct_id: item,
          products_colorProduct_id: newProduct.dataValues.id,
        });
      });
      listSize.forEach(async (item) => {
        const updateSize = await SizeProduct.create({
          size_sizeProduct_id: item,
          products_sizeProduct_id: newProduct.dataValues.id,
        });
      });
      listTag.forEach(async (item) => {
        const updateTag = await TagProduct.create({
          tags_tagProduct_id: item,
          products_tagProduct_id: newProduct.dataValues.id,
        });
      });
    }

    setTimeout(() => {
      if (newProduct) {
        res.status(201).send(newProduct);
      } else {
        throw new Error("Cannot create new product");
      }
    }, 500);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSaleProduct = async (req, res) => {
  try {
    let [products, metadataProduct] = await sequelize.query(
      "SELECT products.id, products.material, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.percent_sale is not null and products.percent_sale != 0  and products.isDelete = 0"
    );
    const [resultSize, metadataSize] = await sequelize.query(
      "SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.percent_sale is not null and products.percent_sale != 0 and products.isDelete = 0"
    );
    const [resultColor, metadataColor] = await sequelize.query(
      "SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.percent_sale is not null and products.percent_sale != 0 and products.isDelete = 0"
    );
    const [resultTag, metadataTag] = await sequelize.query(
      "SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.percent_sale is not null and products.percent_sale != 0 and products.isDelete = 0"
    );
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.percent_sale is not null and products.percent_sale != 0 and products.isDelete = 0"
    );
    const [resultOrder, metadataOrder] = await sequelize.query(
      "SELECT products.id, orderdetails.count, orderdetails.rating FROM ecommerce_clothes.orders, ecommerce_clothes.orderdetails, ecommerce_clothes.products WHERE orderdetails.products_orderDetail_id = products.id and orders.status = 3 and orderdetails.orders_orderDetail_id = orders.id;"
    );

    const mergedOrders = resultOrder.reduce((acc, order) => {
      const existingOrder = acc.find((item) => item.id === order.id);
      if (!existingOrder) {
        acc.push({ ...order });
      } else {
        existingOrder.count += order.count;
        if (order.rating !== null) {
          existingOrder.rating = existingOrder.rating || 0;
          existingOrder.rating = (existingOrder.rating + order.rating) / 2;
        }
      }
      return acc;
    }, []);

    products = products.map((item) => {
      const { id } = item;
      const foundItem = mergedOrders.find((resultItem) => resultItem.id === id);

      if (foundItem) {
        return {
          ...item,
          sold: foundItem.count,
          rating: foundItem.rating,
        };
      } else {
        return {
          ...item,
          sold: null,
          rating: null,
        };
      }
    });

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
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultImage[i].id) {
          if (products[j].listImage == undefined) {
            products[j]["listImage"] = [];
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          } else {
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url,
            isMain: products[products.length - 1].isMain,
          },
        ];
        delete products[products.length - 1].url;
        delete products[products.length - 1].isMain;
      }
    }

    // gắn brand
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

    for (let j = 0; j < products.length; j++) {
      if (products[j].listSize == undefined) {
        products[j]["listSize"] = [];
      }
      if (products[j].listColor == undefined) {
        products[j]["listColor"] = [];
      }
    }

    if (products.length !== 0) {
      res.status(200).send(products);
    } else {
      throw new Error("Cannot get all product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getNewProduct = async (req, res) => {
  try {
    let [products, metadataProduct] = await sequelize.query(
      "SELECT products.id, products.material, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.isDelete = 0 ORDER BY products.updatedAt DESC LIMIT 24"
    );
    const [resultSize, metadataSize] = await sequelize.query(
      "SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.isDelete = 0 ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultColor, metadataColor] = await sequelize.query(
      "SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.isDelete = 0 ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultTag, metadataTag] = await sequelize.query(
      "SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.isDelete = 0 ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.isDelete = 0"
    );
    const [resultOrder, metadataOrder] = await sequelize.query(
      "SELECT products.id, orderdetails.count, orderdetails.rating FROM ecommerce_clothes.orders, ecommerce_clothes.orderdetails, ecommerce_clothes.products WHERE orderdetails.products_orderDetail_id = products.id and orders.status = 3 and orderdetails.orders_orderDetail_id = orders.id;"
    );

    const mergedOrders = resultOrder.reduce((acc, order) => {
      const existingOrder = acc.find((item) => item.id === order.id);
      if (!existingOrder) {
        acc.push({ ...order });
      } else {
        existingOrder.count += order.count;
        if (order.rating !== null) {
          existingOrder.rating = existingOrder.rating || 0;
          existingOrder.rating = (existingOrder.rating + order.rating) / 2;
        }
      }
      return acc;
    }, []);

    products = products.map((item) => {
      const { id } = item;
      const foundItem = mergedOrders.find((resultItem) => resultItem.id === id);

      if (foundItem) {
        return {
          ...item,
          sold: foundItem.count,
          rating: foundItem.rating,
        };
      } else {
        return {
          ...item,
          sold: null,
          rating: null,
        };
      }
    });

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
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultImage[i].id) {
          if (products[j].listImage == undefined) {
            products[j]["listImage"] = [];
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          } else {
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url,
            isMain: products[products.length - 1].isMain,
          },
        ];
        delete products[products.length - 1].url;
        delete products[products.length - 1].isMain;
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

    if (products.length !== 0) {
      res.status(200).send(products);
    } else {
      throw new Error("Cannot get all product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  const { name_product, price, percent_sale, remain } = req.body;
  const { id } = req.query;
  try {
    const product = await Products.update(
      {
        name_product,
        price,
        percent_sale,
        remain,
      },
      {
        where: {
          id,
        },
      }
    );
    if (product) {
      res.status(201).send(`Success update product id = ${id}`);
    } else {
      throw new Error("Cannot update product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Products.update(
      { isDelete: 1 },
      {
        where: {
          id,
        },
      }
    );
    if (product) {
      res.status(200).send(`Success delete product id = ${id}`);
    } else {
      throw new Error("Cannot delete product");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductByCateId = async (req, res) => {
  const { id } = req.query;
  try {
    if (id == 1) {
      let [products, metadataProduct] = await sequelize.query(
        `SELECT products.id, products.material, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.isDelete = 0`
      );
      const [resultSize, metadataSize] = await sequelize.query(
        `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.isDelete = 0`
      );
      const [resultColor, metadataColor] = await sequelize.query(
        `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.isDelete = 0`
      );
      const [resultTag, metadataTag] = await sequelize.query(
        `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.isDelete = 0`
      );
      const [resultImage, metadataImage] = await sequelize.query(
        `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.isDelete = 0`
      );
      const [resultOrder, metadataOrder] = await sequelize.query(
        "SELECT products.id, orderdetails.count, orderdetails.rating FROM ecommerce_clothes.orders, ecommerce_clothes.orderdetails, ecommerce_clothes.products WHERE orderdetails.products_orderDetail_id = products.id and orders.status = 3 and orderdetails.orders_orderDetail_id = orders.id;"
      );

      const mergedOrders = resultOrder.reduce((acc, order) => {
        const existingOrder = acc.find((item) => item.id === order.id);
        if (!existingOrder) {
          acc.push({ ...order });
        } else {
          existingOrder.count += order.count;
          if (order.rating !== null) {
            existingOrder.rating = existingOrder.rating || 0;
            existingOrder.rating = (existingOrder.rating + order.rating) / 2;
          }
        }
        return acc;
      }, []);

      products = products.map((item) => {
        const { id } = item;
        const foundItem = mergedOrders.find(
          (resultItem) => resultItem.id === id
        );

        if (foundItem) {
          return {
            ...item,
            sold: foundItem.count,
            rating: foundItem.rating,
          };
        } else {
          return {
            ...item,
            sold: null,
            rating: null,
          };
        }
      });

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
        let count = 0;
        for (let j = 0; j < products.length; j++) {
          if (products[j].id == resultImage[i].id) {
            if (products[j].listImage == undefined) {
              products[j]["listImage"] = [];
              products[j]["listImage"].push({
                url: "http://localhost:3000/product/" + resultImage[i].url,
                isMain: resultImage[i].isMain,
              });
            } else {
              products[j]["listImage"].push({
                url: "http://localhost:3000/product/" + resultImage[i].url,
                isMain: resultImage[i].isMain,
              });
            }
            count++;
          }
        }
        if (count == 0) {
          products.push(resultImage[i]);
          products[products.length - 1]["listImage"] = [
            ...{
              url:
                "http://localhost:3000/product/" +
                products[products.length - 1].url,
              isMain: products[products.length - 1].isMain,
            },
          ];
          delete products[products.length - 1].url;
          delete products[products.length - 1].isMain;
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

      if (products.length !== 0) {
        res.status(200).send(products);
      } else {
        throw new Error("Cannot get product by category id");
      }
    } else {
      const [product2, metadataProduct2] = await sequelize.query(
        `SELECT products.id, categories.parent_id, products.material, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.brands, ecommerce_clothes.categories, ecommerce_clothes.products WHERE products.brand_products_id = brands.id and categories.id = products.cate_products_id and products.isDelete = 0;`
      );
      const [cates, metadataCate] = await sequelize.query(
        `select id from categories where parent_id=${id}`
      );
      let products = [];

      product2.forEach((item) => {
        if (item.parent_id == id) {
          products.push(item);
        } else if (item.cate_products_id == id) {
          products.push(item);
        } else if (item.parent_id !== null) {
          cates.forEach(async (x) => {
            const [cate1, metadataCate1] = await sequelize.query(
              `select id from categories where id = ${item.cate_products_id} and parent_id = ${x.id}`
            );
            if (cate1.length == 1) {
              products.push(item);
            }
          });
        }
      });
      const [resultOrder, metadataOrder] = await sequelize.query(
        "SELECT products.id, orderdetails.count, orderdetails.rating FROM ecommerce_clothes.orders, ecommerce_clothes.orderdetails, ecommerce_clothes.products WHERE orderdetails.products_orderDetail_id = products.id and orders.status = 3 and orderdetails.orders_orderDetail_id = orders.id;"
      );

      const mergedOrders = resultOrder.reduce((acc, order) => {
        const existingOrder = acc.find((item) => item.id === order.id);
        if (!existingOrder) {
          acc.push({ ...order });
        } else {
          existingOrder.count += order.count;
          if (order.rating !== null) {
            existingOrder.rating = existingOrder.rating || 0;
            existingOrder.rating = (existingOrder.rating + order.rating) / 2;
          }
        }
        return acc;
      }, []);

      products = products.map((item) => {
        const { id } = item;
        const foundItem = mergedOrders.find(
          (resultItem) => resultItem.id === id
        );

        if (foundItem) {
          return {
            ...item,
            sold: foundItem.count,
            rating: foundItem.rating,
          };
        } else {
          return {
            ...item,
            sold: null,
            rating: null,
          };
        }
      });
      const [resultSize, metadataSize] = await sequelize.query(
        `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes, ecommerce_clothes.categories WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and categories.id = products.cate_products_id and products.isDelete = 0`
      );
      const [resultColor, metadataColor] = await sequelize.query(
        `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors, ecommerce_clothes.categories WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and categories.id = products.cate_products_id and products.isDelete = 0`
      );
      const [resultTag, metadataTag] = await sequelize.query(
        `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags, ecommerce_clothes.categories WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and categories.id = products.cate_products_id and products.isDelete = 0`
      );
      const [resultImage, metadataImage] = await sequelize.query(
        `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products, ecommerce_clothes.categories WHERE products.id = imageproducts.product_imageProduct_id and categories.id = products.cate_products_id and products.isDelete = 0`
      );

      setTimeout(() => {
        // gắn size vào product
        for (let i = 0; i < resultSize.length; i++) {
          for (let j = 0; j < products.length; j++) {
            if (products[j].id == resultSize[i].id) {
              if (products[j].listSize == undefined) {
                products[j]["listSize"] = [];
                products[j]["listSize"].push(resultSize[i].size);
              } else {
                products[j]["listSize"].push(resultSize[i].size);
              }
            }
          }
        }

        //gắn color vào product
        for (let i = 0; i < resultColor.length; i++) {
          for (let j = 0; j < products.length; j++) {
            if (products[j].id == resultColor[i].id) {
              if (products[j].listColor == undefined) {
                products[j]["listColor"] = [];
                products[j]["listColor"].push(resultColor[i].color);
              } else {
                products[j]["listColor"].push(resultColor[i].color);
              }
            }
          }
        }

        //gắn tags vào product
        for (let i = 0; i < resultTag.length; i++) {
          for (let j = 0; j < products.length; j++) {
            if (products[j].id == resultTag[i].id) {
              if (products[j].listTag == undefined) {
                products[j]["listTag"] = [];
                products[j]["listTag"].push(resultTag[i].name_tag);
              } else {
                products[j]["listTag"].push(resultTag[i].name_tag);
              }
            }
          }
        }
        //gắn image vào product
        for (let i = 0; i < resultImage.length; i++) {
          for (let j = 0; j < products.length; j++) {
            if (products[j].id == resultImage[i].id) {
              if (products[j].listImage == undefined) {
                products[j]["listImage"] = [];
                products[j]["listImage"].push({
                  url: "http://localhost:3000/product/" + resultImage[i].url,
                  isMain: resultImage[i].isMain,
                });
              } else {
                products[j]["listImage"].push({
                  url: "http://localhost:3000/product/" + resultImage[i].url,
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
        if (products.length !== 0) {
          res.status(200).send(products);
        } else {
          res.status(500).send(products);
        }
      }, 500);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.query;
  try {
    let [products, metadataProduct] = await sequelize.query(
      `SELECT products.id, products.material, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.name_product like '%${name}%' and products.isDelete = 0`
    );
    const [resultSize, metadataSize] = await sequelize.query(
      `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.name_product like '%${name}%' and products.isDelete = 0`
    );
    const [resultColor, metadataColor] = await sequelize.query(
      `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.name_product like '%${name}%' and products.isDelete = 0`
    );
    const [resultTag, metadataTag] = await sequelize.query(
      `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.name_product like '%${name}%' and products.isDelete = 0`
    );
    const [resultImage, metadataImage] = await sequelize.query(
      `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.name_product like '%${name}%' and products.isDelete = 0`
    );
    const [resultOrder, metadataOrder] = await sequelize.query(
      "SELECT products.id, orderdetails.count, orderdetails.rating FROM ecommerce_clothes.orders, ecommerce_clothes.orderdetails, ecommerce_clothes.products WHERE orderdetails.products_orderDetail_id = products.id and orders.status = 3 and orderdetails.orders_orderDetail_id = orders.id;"
    );

    const mergedOrders = resultOrder.reduce((acc, order) => {
      const existingOrder = acc.find((item) => item.id === order.id);
      if (!existingOrder) {
        acc.push({ ...order });
      } else {
        existingOrder.count += order.count;
        if (order.rating !== null) {
          existingOrder.rating = existingOrder.rating || 0;
          existingOrder.rating = (existingOrder.rating + order.rating) / 2;
        }
      }
      return acc;
    }, []);

    products = products.map((item) => {
      const { id } = item;
      const foundItem = mergedOrders.find((resultItem) => resultItem.id === id);

      if (foundItem) {
        return {
          ...item,
          sold: foundItem.count,
          rating: foundItem.rating,
        };
      } else {
        return {
          ...item,
          sold: null,
          rating: null,
        };
      }
    });

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
      let count = 0;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == resultImage[i].id) {
          if (products[j].listImage == undefined) {
            products[j]["listImage"] = [];
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          } else {
            products[j]["listImage"].push({
              url: "http://localhost:3000/product/" + resultImage[i].url,
              isMain: resultImage[i].isMain,
            });
          }
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url,
            isMain: products[products.length - 1].isMain,
          },
        ];
        delete products[products.length - 1].url;
        delete products[products.length - 1].isMain;
      }
    }

    // gắn brand
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

    if (products) {
      res.status(200).send(products);
    } else {
      throw new Error(`Cannot get list product by name = ${name}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadImageProduct = async (req, res) => {
  const image = req.file;
  const { id, isMain } = req.query;
  try {
    if (isMain === "true") {
      const createImg = await ImageProduct.create({
        url: image.filename,
        product_imageProduct_id: parseInt(id),
        isMain: 1,
      });
      if (createImg) {
        res.status(201).send("upload image product success");
      } else {
        throw new Error("Upload image for product is error!");
      }
    } else {
      const createImg = await ImageProduct.create({
        url: image.filename,
        product_imageProduct_id: parseInt(id),
        isMain: 0,
      });
      if (createImg) {
        res.status(201).send("upload image product success");
      } else {
        throw new Error("Upload image for product is error!");
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

const getAtrrProduct = async (req, res) => {
  try {
    const size = await Size.findAll();
    const color = await Color.findAll();
    const cate = await Categories.findAll({
      where: {
        parent_id: {
          [Op.ne]: null,
        },
      },
    });
    const tags = await Tags.findAll();
    let result = {
      listColor: [],
      listSize: [],
      listTag: [],
      listCate: [],
    };
    size.forEach((item) => {
      result.listSize.push(item.dataValues);
    });
    color.forEach((item) => {
      result.listColor.push(item.dataValues);
    });
    tags.forEach((item) => {
      result.listTag.push(item.dataValues);
    });
    cate.forEach(async (item) => {
      const detailCate = await Categories.findOne({
        where: {
          id: item.dataValues.parent_id,
        },
      });
      result.listCate.push({
        id: item.dataValues.id,
        name_category:
          item.dataValues.name_category +
          " (" +
          detailCate.dataValues.name_category +
          ")",
        updatedAt: item.dataValues.updatedAt,
        createdAt: item.dataValues.createdAt,
      });
    });
    setTimeout(() => {
      if (result) {
        res.status(200).send(result);
      } else {
        throw new Error("Error server");
      }
    }, 500);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSaleProduct,
  getNewProduct,
  getProductByCateId,
  getProductByName,
  uploadImageProduct,
  getAtrrProduct,
};
