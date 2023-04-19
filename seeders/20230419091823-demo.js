'use strict';


const express = require("express");
// const sequelize = require("./config/database");
var app = express();
app.use(express.json())
const { Op, QueryInterface } = require("sequelize");
// var user = require("./models/user.model");
// var { paranoidDelete, userTable } = require("./models");
var User2 = require("../models" ).User2;


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User2.bulkCreate([
      {
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      newTime:"5",
      newTime2:"66",
      createdAt: new Date(),
      updatedAt: new Date(),
     
       }, 
       {
        firstName: 'virat',
        lastName: 'kohli',
        email: 'example@example.com',
        newTime:"54",
        newTime2:"66",
        createdAt: new Date(),
        updatedAt: new Date(),
       
         }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User2s', null, {});
  }
};
