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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",

    
  });

  playlist.associate=function(models){
    playlist.belongsToMany(models.song,{through:"song_playlist",foreignKey: "playlistId"},{onDelete: 'CASCADE' })
  }
  
  return playlist;
};