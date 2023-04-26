"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class userScope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userScope.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "userScope",
    }
  );

  userScope.associate = (models) => {

    userScope.hasMany(models.post,{foreignKey:"userId"})

    
    userScope.addScope("showUserAbove18", {
      where: {
        age: {
          [Op.gt]: 50,
        },
      },
    });

    userScope.addScope("defaultScope", {
      include: models.post,
    });
  };

  return userScope;
};
