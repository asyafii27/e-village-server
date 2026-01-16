'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: true, // supaya aman kalau sudah ada data lama
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password');
  },
};
