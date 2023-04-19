'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("User2s","newTime2",{
        type:Sequelize.INTEGER,
        allowNull:false
    })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("User2","newTime"),
    ])
  }
};
