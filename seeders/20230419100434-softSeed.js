'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let newSoft=await queryInterface.create({
      name:"Modi",
      age:"23"
    })

    console.log(newSoft,"inside the seed er");
  },

  async down (queryInterface, Sequelize) {
 
  }
};
