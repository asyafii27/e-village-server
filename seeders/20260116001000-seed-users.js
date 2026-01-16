'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'User Satu',
          email: 'user1@example.com',
          email_verified_at: now,
          created_at: now,
          updated_at: now,
        },
        {
          name: 'User Dua',
          email: 'user2@example.com',
          email_verified_at: now,
          created_at: now,
          updated_at: now,
        },
        {
          name: 'User Tiga',
          email: 'user3@example.com',
          email_verified_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          name: 'User Empat',
          email: 'user4@example.com',
          email_verified_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          name: 'User Lima',
          email: 'user5@example.com',
          email_verified_at: now,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
