'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Total extends Model {
    static associate({User}) {
    Total.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER
    },
    data: {
      type: DataTypes.TEXT
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }
  const options = {
    sequelize,
    modelName: 'Total',
    tableName: 'Totals'
  }
  Total.init(attributes, options);
  return Total;
};