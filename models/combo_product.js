'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class combo_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.app_product, {
        foreignKey: 'combo_id',
        as: 'app_products'
      })
      this.hasMany(models.app_product, {
        foreignKey: 'include_combo_id',
        as: 'include_products'
      })
    }
  };
  combo_product.init({
    combo_name: DataTypes.STRING,
    description: DataTypes.STRING,
    combo_price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'combo_product',
  });
  return combo_product;
};
