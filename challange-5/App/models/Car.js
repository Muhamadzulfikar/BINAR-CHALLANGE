'use strict';
const { Model, DataTypes, } = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize) => {
  class Car extends Model {
    static associate(models) {
    }
  }

  Car.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          min:5,
          max:255,
          notEmpty:true,
        }
      },
      type: {
        type: DataTypes.ENUM('small','medium','large'),
        validate: {
          isIn: [['small','medium','large']],
          notEmpty: true,
        }
      },
      capacity:{
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 1,  
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        }
      },
      rent_per_day: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 100000,
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          min:5,
          max:255,
        }
      },
      available_at: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isDate: true,
        }
      },
    },
    {
      sequelize,
      modelName: 'Car',
      tableName: 'cars',
      timestamps: true,
    }
  );

  Car.beforeCreate(car => car.id == uuidv4())

  return Car;
};