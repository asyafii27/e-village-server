'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('residents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nik: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      religion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      place_of_birth: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      rt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rw: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Desa
      village: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Sugihan',
      },
      marital_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('residents');
  },
};
