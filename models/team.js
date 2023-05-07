"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      team.hasMany(models.player, {
        foreignKey:"teamId",
        onDelete: "CASCADE",
      });
    }
  }
  team.init(
    {
      teamName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      onDelete: "CASCADE",
      modelName: "team",
    }
  );

  return team;
};
