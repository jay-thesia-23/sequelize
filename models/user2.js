"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User2.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allownull: true,
      },
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid:true,
      modelName: "User2",
    }
  );
  return User2;
};
