"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
      url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Image",
      paranoid:true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  );


  Image.associate = function (models) {
    Image.hasMany(models.Comment, {
      foreignKey: "commentId",
      constraints: false,
      scope : {
        commentType : 'Image'
      }
    });
  };

  return Image;
};
