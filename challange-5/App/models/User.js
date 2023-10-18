'use strict';
const { Model, DataTypes, } = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        min: 5,
        max: 255,
        notEmpty: true,
      }
    },
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password:{
      type: DataTypes.CHAR(60),
      validate: {
        min: 60,
        max: 60,
        notEmpty: true,
      },
    },
    phone:{
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    role:{
      type: DataTypes.ENUM('user', 'admin', 'super admin'),
      validate: {
        isIn:[['user','admin','super admin']],
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });

  User.beforeCreate(car => car.id == uuidv4());

  return User;
};