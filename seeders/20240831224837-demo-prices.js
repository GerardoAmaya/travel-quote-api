'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Prices', [
      {
        coverageId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-30',
        amount: 100.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        coverageId: 2,
        startDate: '2024-09-01',
        endDate: '2024-09-30',
        amount: 80.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prices', null, {});
  }
};
