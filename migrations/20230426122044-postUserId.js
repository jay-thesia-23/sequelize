"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      await queryInterface.addColumn("posts", "userId", {
        type: DataTypes.INTEGER,
        allowNull: false,
      }),

      await queryInterface.addConstraint("posts", {
        references: {
          field: "id",
          table: "userScopes",
        },

        type: "foreign key",
        fields: ["userId"],
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return Promise.all([await queryInterface.removeColumn("posts", "userId")]);
  },
};
