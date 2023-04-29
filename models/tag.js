'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag',
  });

  tag.associate=function(models){
    tag.belongsToMany(models.Image, {
      through: {
        model: models.Tag_Taggable,
        
      },
      foreignKey: 'tagId',
      constraints: false
    });
  }

  tag.associate=function(models){
    tag.belongsToMany(models.Video, {
      through: {
        model: models.Tag_Taggable,
      },
      foreignKey: 'tagId',
      constraints: false
    });
  }
  
  return tag;
};