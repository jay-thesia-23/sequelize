'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User2s', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      newTime:5,
      newTime2:66,
      createdAt: new Date(),
      updatedAt: new Date(),
     
       }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User2s', null, {});
  }
};
