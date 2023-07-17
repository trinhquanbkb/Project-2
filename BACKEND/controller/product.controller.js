const { Products } = require("../models");
const { sequelize } = require("../models/index");

//CRUD product
const getAllProduct = async (req, res) => {
  try {
    const [products, metadataProduct] = await sequelize.query(
      "SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id"
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
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id;"
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
      let count = 0;
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
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url +
              ".png",
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
    brand_products_id,
    cate_products_id,
    remain,
  } = req.body;
  try {
    const newProduct = await Products.create({
      name_product,
      description_detail,
      price,
      percent_sale,
      brand_products_id,
      cate_products_id,
      remain,
    });
    if (newProduct) {
      res.status(201).send(newProduct);
    } else {
      throw new Error("Cannot create new product");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSaleProduct = async (req, res) => {
  try {
    const [products, metadataProduct] = await sequelize.query(
      "SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.percent_sale is not null and products.percent_sale != 0"
    );
    const [resultSize, metadataSize] = await sequelize.query(
      "SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.percent_sale is not null and products.percent_sale != 0"
    );
    const [resultColor, metadataColor] = await sequelize.query(
      "SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.percent_sale is not null and products.percent_sale != 0"
    );
    const [resultTag, metadataTag] = await sequelize.query(
      "SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.percent_sale is not null and products.percent_sale != 0"
    );
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.percent_sale is not null and products.percent_sale != 0"
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
      let count = 0;
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
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url +
              ".png",
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
    const [products, metadataProduct] = await sequelize.query(
      "SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultSize, metadataSize] = await sequelize.query(
      "SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultColor, metadataColor] = await sequelize.query(
      "SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultTag, metadataTag] = await sequelize.query(
      "SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id ORDER BY products.updatedAt DESC LIMIT 20"
    );
    const [resultImage, metadataImage] = await sequelize.query(
      "SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id"
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
      let count = 0;
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
          count++;
        }
      }
      if (count == 0) {
        products.push(resultImage[i]);
        products[products.length - 1]["listImage"] = [
          ...{
            url:
              "http://localhost:3000/product/" +
              products[products.length - 1].url +
              ".png",
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
  const {
    cate_products_id,
    brand_products_id,
    name_product,
    price,
    percent_sale,
    remain,
    description_detail,
  } = req.body;
  const { id } = req.query;
  try {
    const product = await Products.update(
      {
        cate_products_id,
        brand_products_id,
        name_product,
        price,
        percent_sale,
        remain,
        description_detail,
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
    const product = await Products.destroy({
      where: {
        id,
      },
    });
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
      const [products, metadataProduct] = await sequelize.query(
        `SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id`
      );
      const [resultSize, metadataSize] = await sequelize.query(
        `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id`
      );
      const [resultColor, metadataColor] = await sequelize.query(
        `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id`
      );
      const [resultTag, metadataTag] = await sequelize.query(
        `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id`
      );
      const [resultImage, metadataImage] = await sequelize.query(
        `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id`
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
        let count = 0;
        for (let j = 0; j < products.length; j++) {
          if (products[j].id == resultImage[i].id) {
            if (products[j].listImage == undefined) {
              products[j]["listImage"] = [];
              products[j]["listImage"].push({
                url:
                  "http://localhost:3000/product/" +
                  resultImage[i].url +
                  ".png",
                isMain: resultImage[i].isMain,
              });
            } else {
              products[j]["listImage"].push({
                url:
                  "http://localhost:3000/product/" +
                  resultImage[i].url +
                  ".png",
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
                products[products.length - 1].url +
                ".png",
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
      let [products, metadataProduct] = await sequelize.query(
        `SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.products, ecommerce_clothes.brands where products.brand_products_id = brands.id and products.cate_products_id =${id}`
      );
      const [product1, metadataProduct1] = await sequelize.query(
        `SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.brands, ecommerce_clothes.categories, ecommerce_clothes.products WHERE products.brand_products_id = brands.id and categories.parent_id = ${id} and categories.id = products.cate_products_id;`
      );
      const [product2, metadataProduct2] = await sequelize.query(
        `SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.brands, ecommerce_clothes.categories, ecommerce_clothes.products WHERE products.brand_products_id = brands.id and categories.id = products.cate_products_id;`
      );
      const [cateId, metadatacateId] = await sequelize.query(
        `SELECT id FROM categories WHERE categories.parent_id = ${id}`
      );

      let resultSize = [];
      let resultColor = [];
      let resultImage = [];
      let resultTag = [];
      let listCateId = [];
      if (product1.length !== 0) {
        products = [];
        product1.forEach((item) => {
          products.push(item);
        });
        const [resultSize1, metadataSize] = await sequelize.query(
          `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes, ecommerce_clothes.categories WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id  and categories.parent_id = ${id} and categories.id = products.cate_products_id`
        );
        const [resultColor1, metadataColor] = await sequelize.query(
          `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors, ecommerce_clothes.categories WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id  and categories.parent_id = ${id} and categories.id = products.cate_products_id`
        );
        const [resultTag1, metadataTag] = await sequelize.query(
          `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags, ecommerce_clothes.categories WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and categories.parent_id = ${id} and categories.id = products.cate_products_id`
        );
        const [resultImage1, metadataImage] = await sequelize.query(
          `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products, ecommerce_clothes.categories WHERE products.id = imageproducts.product_imageProduct_id and categories.parent_id = ${id} and categories.id = products.cate_products_id`
        );
        resultColor1.forEach((item) => {
          resultColor.push(item);
        });
        resultImage1.forEach((item) => {
          resultImage.push(item);
        });
        resultSize1.forEach((item) => {
          resultSize.push(item);
        });
        resultTag1.forEach((item) => {
          resultTag.push(item);
        });
      } else if (product2.length !== 0 && cateId.length !== 0) {
        products = [];
        cateId.forEach(async (item) => {
          let [t, metadatat] = await sequelize.query(
            `SELECT id FROM categories WHERE categories.parent_id = ${item.id}`
          );
          if (t.length > 0) {
            t.forEach((gg) => {
              listCateId.push(gg.id);
            });
          }
        });
        setTimeout(async () => {
          listCateId.forEach(async (ff) => {
            const [p, metadataProductp] = await sequelize.query(
              `SELECT products.id, products.cate_products_id, products.name_product, products.price, products.percent_sale, products.remain, products.description_detail, products.createdAt, products.updatedAt, brands.name_brand FROM ecommerce_clothes.brands, ecommerce_clothes.products WHERE products.brand_products_id = brands.id and products.cate_products_id = ${ff};`
            );
            if (p.length > 0) {
              p.forEach((l) => {
                products.push(l);
              });
            }
          });
          const [resultSize1, metadataSize] = await sequelize.query(
            `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes, ecommerce_clothes.categories WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and categories.id = products.cate_products_id`
          );
          const [resultColor1, metadataColor] = await sequelize.query(
            `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors, ecommerce_clothes.categories WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and categories.id = products.cate_products_id`
          );
          const [resultTag1, metadataTag] = await sequelize.query(
            `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags, ecommerce_clothes.categories WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and categories.id = products.cate_products_id`
          );
          const [resultImage1, metadataImage] = await sequelize.query(
            `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products, ecommerce_clothes.categories WHERE products.id = imageproducts.product_imageProduct_id and categories.id = products.cate_products_id`
          );
          resultColor1.forEach((item) => {
            resultColor.push(item);
          });
          resultImage1.forEach((item) => {
            resultImage.push(item);
          });
          resultSize1.forEach((item) => {
            resultSize.push(item);
          });
          resultTag1.forEach((item) => {
            resultTag.push(item);
          });
        }, 200);
      } else {
        const [resultSize1, metadataSize] = await sequelize.query(
          `SELECT products.id, sizes.size FROM ecommerce_clothes.sizeproducts, ecommerce_clothes.products, ecommerce_clothes.sizes WHERE sizeproducts.products_sizeProduct_id = products.id and sizeproducts.size_sizeProduct_id = sizes.id and products.cate_products_id =${id}`
        );
        const [resultColor1, metadataColor] = await sequelize.query(
          `SELECT products.id, colors.color FROM ecommerce_clothes.colorproducts, ecommerce_clothes.products, ecommerce_clothes.colors WHERE colorproducts.products_colorProduct_id = products.id and colorproducts.color_colorProduct_id = colors.id and products.cate_products_id =${id}`
        );
        const [resultTag1, metadataTag] = await sequelize.query(
          `SELECT products.id, tags.name_tag FROM ecommerce_clothes.tagproducts, ecommerce_clothes.products, ecommerce_clothes.tags WHERE tagproducts.products_tagProduct_id = products.id and tagproducts.tags_tagProduct_id = tags.id and products.cate_products_id =${id}`
        );
        const [resultImage1, metadataImage] = await sequelize.query(
          `SELECT products.id, imageproducts.isMain, imageproducts.url FROM ecommerce_clothes.imageproducts, ecommerce_clothes.products WHERE products.id = imageproducts.product_imageProduct_id and products.cate_products_id =${id}`
        );
        resultColor1.forEach((item) => {
          resultColor.push(item);
        });
        resultImage1.forEach((item) => {
          resultImage.push(item);
        });
        resultSize1.forEach((item) => {
          resultSize.push(item);
        });
        resultTag1.forEach((item) => {
          resultTag.push(item);
        });
      }
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
                  url:
                    "http://localhost:3000/product/" +
                    resultImage[i].url +
                    ".png",
                  isMain: resultImage[i].isMain,
                });
              } else {
                products[j]["listImage"].push({
                  url:
                    "http://localhost:3000/product/" +
                    resultImage[i].url +
                    ".png",
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

module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSaleProduct,
  getNewProduct,
  getProductByCateId,
};
