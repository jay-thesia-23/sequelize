'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init({
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Video',
    paranoid:true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Video.associate = function (models) {
    Video.hasMany(models.Comment, {
      foreignKey: "commentId",
      constraints: false,
      scope : {
        commentType : 'Video'
      }
    });
  };
  return Video;
};