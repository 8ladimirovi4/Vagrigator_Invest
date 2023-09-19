const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cash extends Model {
    static associate({User}) {
      Cash.belongsTo(User, { foreignKey: 'user_id' });    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
  modelName: 'Cash',
  tableName: 'Cashs'
}
  Cash.init(attributes, options);
  return Cash;
};