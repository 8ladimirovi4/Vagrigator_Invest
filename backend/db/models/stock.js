const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
       static associate({User}) {
        Stock.belongsTo(User, { foreignKey: 'user_id' });    }
    }
    const attributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.TEXT
      },
      ticker: {
        type: DataTypes.TEXT
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.TEXT
      },
      date: {
        type: DataTypes.TEXT
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }
    const options = {
      sequelize,
      modelName: 'Stock',
      tableName: 'Stocks'
    }
  Stock.init(attributes, options);
  return Stock;
};