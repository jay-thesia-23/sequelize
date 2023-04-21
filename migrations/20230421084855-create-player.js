'use strict';
/** @type {import('sequelize-cli').Migration} */

var team=require("../models").team
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      teamId:{
        type:Sequelize.INTEGER
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


    await queryInterface.addConstraint("players",{
      references:{
        field:'id',
        table:"teams"
      },
      type:'foreign key',
      fields:['teamId']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};