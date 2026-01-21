const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const password = await bcrypt.hash('password123', 10);

    for (let i = 21; i <= 40; i++) {
      users.push({
        email: `user${i}@example.com`,
        name: `user${i}`,
        password: password,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};