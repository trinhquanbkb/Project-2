"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Categories,
      OrderDetail,
      Brand,
      SizeProduct,
      MaterialProduct,
      TagProduct,
      ImageProduct,
      ColorProduct,
    }) {
      this.belongsTo(Brand, { foreignKey: "brand_products_id" });
      this.belongsTo(Categories, { foreignKey: "cate_products_id" });
      this.hasMany(SizeProduct, { foreignKey: "products_sizeProduct_id" });
      this.hasMany(OrderDetail, { foreignKey: "products_orderDetail_id" });
      this.hasMany(MaterialProduct, {
        foreignKey: "products_materialProduct_id",
      });
      this.hasMany(TagProduct, { foreignKey: "products_tagProduct_id" });
      this.hasMany(ImageProduct, { foreignKey: "product_imageProduct_id" });
      this.hasMany(ColorProduct, { foreignKey: "products_colorProduct_id" });
    }
  }
  Products.init(
    {
      name_product: DataTypes.STRING,
      description_detail: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      remain: DataTypes.INTEGER, //số lượng hàng còn lại
      percent_sale: DataTypes.INTEGER,
      material: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
