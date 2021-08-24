'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product_brand.init({
    name: DataTypes.STRING,
    product_category_id: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'product_brand',
  });
  return product_brand;
};
