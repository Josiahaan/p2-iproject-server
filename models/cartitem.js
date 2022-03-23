'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.User)
    }
  }
  CartItem.init({
    quantity: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    cart: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue("cart"))
      },
      set(value) {
        return this.setDataValue("cart", JSON.stringify(value))
      }
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};