'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_product_discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.app_product,{
        foreignKey: 'app_discount_id',
        as: 'app_product'
      })
      this.hasOne(models.app_banner, {
        foreignKey: 'discount_id',
        as: 'app_banner'
      })
    }
  };
  app_product_discount.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    discount_amount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'app_product_discount',
  });
  return app_product_discount;
};
