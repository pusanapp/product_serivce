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
                foreignKey: 'barang_id',
                as: 'hafara_product'
            })
            this.hasMany(models.image_product, {
                foreignKey: 'product_id',
                as: 'image_product'
            })
            this.hasMany(models.video_product, {
                foreignKey: 'product_id',
                as: 'video_product'
            })
            this.belongsTo(models.combo_product, {
                foreignKey: 'combo_id',
                as: 'combo_product'
            })
            this.belongsTo(models.combo_product, {
                foreignKey: 'include_combo_id',
                as: 'include_combo'
            })
            this.belongsTo(models.app_product_discount, {
                foreignKey: 'app_discount_id',
                as: 'app_product_discount'
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
        grosir_price: DataTypes.INTEGER,
        grosir: DataTypes.INTEGER,
        discount_price: DataTypes.INTEGER,
        discount: DataTypes.FLOAT,
        weight: DataTypes.FLOAT,
        description: DataTypes.TEXT,
        detail: DataTypes.TEXT,
        specification: DataTypes.TEXT,
        keyword: DataTypes.STRING,
        picture: DataTypes.STRING,
        status: DataTypes.INTEGER,
        is_new: DataTypes.INTEGER,
        is_favorite: DataTypes.INTEGER,
        sold: DataTypes.INTEGER,
        seen: DataTypes.INTEGER,
        combo_id: DataTypes.INTEGER,
        combo_name: DataTypes.STRING,
        app_discount_id: DataTypes.INTEGER,
        discount_name: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        type_id: DataTypes.INTEGER,
        brand_id: DataTypes.INTEGER,
        include_combo_id: DataTypes.INTEGER,
        combo_price: DataTypes.INTEGER
    }, {
        sequelize,
        paranoid: true,
        modelName: 'app_product',
    });
    return app_product;
};
