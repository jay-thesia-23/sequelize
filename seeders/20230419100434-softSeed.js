'use strict';
var sequelize=require("sequelize")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    try {
      let newSoft=await queryInterface.bulkInsert("paranoidDeletes",[
        {
          name:"Modi",
          age:"23",
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          name:"Jay",
          age:"34",
          createdAt:new Date(),
          updatedAt:new Date()
        }
      ])
      
    } catch (error) {
      console.log(error,"error in seeder")
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("paranoidDeletes")
  }
};
