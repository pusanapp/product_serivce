'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app_product, {
        foreignKey: 'product_id',
        as: 'app_product'
      })
    }
  };
  video_product.init({
    product_id: DataTypes.INTEGER,
    video_url: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'video_product',
  });
  return video_product;
};
