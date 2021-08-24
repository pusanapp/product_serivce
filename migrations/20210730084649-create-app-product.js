'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('app_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      barang_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      discount_price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
      },
      specification: {
        type: Sequelize.TEXT
      },
      keyword: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      is_new: {
        type: Sequelize.INTEGER,
      },
      is_favorite: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('app_products');
  }
};
