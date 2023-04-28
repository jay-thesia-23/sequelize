'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paranoidDelete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paranoidDelete.init({
    name: DataTypes.STRING,
    age: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'paranoidDelete',

  });
  return paranoidDelete;
};