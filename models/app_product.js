'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.e_barang, {
        foreignKey: 'barang_id'
      })
    }
  };
  app_product.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    brand: DataTypes.STRING,
    barang_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount_price: DataTypes.INTEGER,
    discount: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    description: DataTypes.STRING,
    specification: DataTypes.TEXT,
    keyword: DataTypes.STRING,
    picture: DataTypes.STRING,
    status: DataTypes.INTEGER,
    is_new: DataTypes.INTEGER,
    is_favorite: DataTypes.INTEGER,

  }, {
    sequelize,
    paranoid: true,
    modelName: 'app_product',
  });
  return app_product;
};
