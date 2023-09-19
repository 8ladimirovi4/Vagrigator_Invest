const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Asset, Stock, Cash}) {
// User.hasMany(Asset, {foreignKey: 'user_id'})
// User.hasMany(Stock, {foreignKey: 'user_id'})
// User.hasMany(Cash, {foreignKey: 'user_id'})
    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    login: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    jwt: {
      type: DataTypes.TEXT
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
    modelName: 'User',
    tableName: 'Users'
  }
  User.init(attributes, options);
  return User;
};