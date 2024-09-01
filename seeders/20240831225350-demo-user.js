'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('password123', salt);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Gerardo Amaya',
        email: 'gerardoamayatest@gmail.com',
        password: hashedPassword,
        roleId: 1, // Admin
        status: 1
      },
      {
        name: 'User Test',
        email: 'usertest@gmail.com',
        password: hashedPassword,
        roleId: 1, // Admin
        status: 1
      },
      {
        name: 'User Test 2',
        email: 'usertest2@gmail.com',
        password: hashedPassword,
        roleId: 1, // Admin
        status: 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'gerardoamayatest@gmail.com' }, {});
  }
};
