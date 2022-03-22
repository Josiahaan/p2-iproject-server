"use strict";
const { Model } = require("sequelize");
const { hasPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: models.CartItem });
      User.hasMany(models.Shop)
    }
  }
  User.init(
    {
      fullname: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Fullname is required",
          },
          notNull: { msg: "Fullname is required" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hasPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
