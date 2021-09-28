'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.discount_product,{
        foreignKey: 'discount_id',
        as: 'discount_product'
      })
    }
  };
  app_banner.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    image_url: DataTypes.STRING,
    is_discount: DataTypes.BOOLEAN,
    discount_id: DataTypes.INTEGER,
    show: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'app_banner',
  });
  return app_banner;
};
