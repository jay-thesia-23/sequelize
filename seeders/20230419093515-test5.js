'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User2s', [{
      firstName: 'Jay',
      lastName: 'Thesia',
      email: 'example@example.com',
      newTime:5,
      newTime2:90,
      createdAt: new Date(),
      updatedAt: new Date(),
     
       }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User2s', null, {});
  }
};
