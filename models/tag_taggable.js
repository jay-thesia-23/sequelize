'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag_Taggable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tag_Taggable.init({
    taggableId: DataTypes.INTEGER,
    taggableType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag_Taggable',
  });
  return Tag_Taggable;
};