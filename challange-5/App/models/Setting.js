'use strict';
const {Model, DataTypes} = require('sequelize');
const {v4: uuidv4} =  require('uuid')
module.exports = (sequelize) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    key:{
      type: DataTypes.JSON,
      validate: {
        notEmpty: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
    timestamps: true,
  });

  Setting.beforeCreate(setting => setting.id == uuidv4());

  return Setting;
};