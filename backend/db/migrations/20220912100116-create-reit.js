'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      type: {
        // allowNull: false,
        type: Sequelize.TEXT
      },
      purchase_price: {
        // allowNull: false,
        type: Sequelize.INTEGER
      },
      current_price: {
        // allowNull: false,
        type: Sequelize.INTEGER
      },
      currency: {
        // allowNull: false,
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
    await queryInterface.createTable('Reits',attributes);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Reits');
  }
};