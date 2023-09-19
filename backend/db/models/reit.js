'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    type: {
      // allowNull: false,
      type: DataTypes.TEXT
    },
    purchase_price: {
      // allowNull: false,
      type: DataTypes.INTEGER
    },
    current_price: {
      // allowNull: false,
      type: DataTypes.INTEGER
    },
    currency: {
      // allowNull: false,
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
    modelName: 'Reit',
    tableName: 'Reits'
  }
  Reit.init(attributes, options);
  return Reit;
};