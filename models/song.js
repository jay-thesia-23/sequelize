'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  song.init({
    songName: DataTypes.STRING,
    artistName: DataTypes.STRING,
    releaseYear: DataTypes.DATEONLY,
    length: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'song',
  });

  song.associate=(models)=>{
    song.belongsToMany(models.playlist,{through:"song_playlist"})
  }

  
  return song;
};