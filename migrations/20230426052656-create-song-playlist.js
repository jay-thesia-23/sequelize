'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('song_playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistId: {
        type: Sequelize.INTEGER,
        references:{
          model:"playlists",
          key:"id",
         
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      songId: {
        type: Sequelize.INTEGER,
        references:{
          model:"songs",
          key:"id",
          
        },
        onDelete: "CASCADE",
          onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('song_playlists');
  }
};