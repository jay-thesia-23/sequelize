"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      commentId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      commentType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
      paranoid: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Image, {
      foreignKey: "commentId",
      constraints: false,
    });
  };

  Comment.associate = (models) => {
    Comment.belongsTo(models.Video, {
      foreignKey: "commentId",
      constraints: false,
    });
  };

  return Comment;
};
