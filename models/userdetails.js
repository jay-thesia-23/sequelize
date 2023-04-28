'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userDetails.init({
    userId: DataTypes.INTEGER,
    mobileNum: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'userDetails',
  });

  userDetails.associate = function (models) {
    userDetails.belongsTo(models.users, { 
      foreignKey: 'userId', 
      as: 'users' 
    });
  };
  return userDetails;
};