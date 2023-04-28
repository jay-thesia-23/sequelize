"use strict";
const { Model, TableHints } = require("sequelize");
const team = require("./team");

module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  player.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "player",
    }
  );

  player.associate=function(models){
    player.belongsTo(models.team,{foreignKey:'teamId'})
  }


  return player;
};
