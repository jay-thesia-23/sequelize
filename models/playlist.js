'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  playlist.init({
    playlistName: DataTypes.STRING,
    totalSongs: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    size: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'playlist',

    
  });

  playlist.associate=function(models){
    playlist.belongsToMany(models.song,{through:"song_playlist"})
  }
  
  return playlist;
};