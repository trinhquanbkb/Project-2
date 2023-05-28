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
      Category,
      OrderDetail,
      Brand,
      SizeProduct,
      MaterialProduct,
      TagProduct,
      ImageProduct,
      ColorProduct,
    }) {
      this.belongsTo(Brand, { foreignKey: "brand_products_id" });
      this.belongsTo(Category, { foreignKey: "cate_products_id" });
      this.hasMany(SizeProduct, { foreignKey: "products_sizeProduct_id" });
      this.hasMany(OrderDetail, { foreignKey: "products_orderDetail_id" });
      this.hasMany(MaterialProduct, {
        foreignKey: "products_materialProduct_id",
      });
      this.hasMany(TagProduct, { foreignKey: "products_tagProduct_id" });
      this.hasMany(ImageProduct, { foreignKey: "products_imageProduct_id" });
      this.hasMany(ColorProduct, { foreignKey: "products_colorProduct_id" });
    }
  }
  Products.init(
    {
      name_product: DataTypes.STRING,
      description_detail: DataTypes.TEXT,
      salient_feature: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      percent_sale: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
