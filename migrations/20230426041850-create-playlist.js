'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistName: {
        type: Sequelize.STRING
      },
      totalSongs: {
        type: Sequelize.INTEGER
      },
      rank: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });

    // await queryInterface.addConstraint("playlists",{
    //   references:{
    //     field:"id",
    //     table:"playlists"
    //   },
    //   type:"foreign key"

    // })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playlists');
  }
};