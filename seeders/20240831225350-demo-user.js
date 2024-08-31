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
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'gerardoamayatest@gmail.com' }, {});
  }
};
