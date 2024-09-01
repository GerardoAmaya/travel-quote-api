module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Prices', [
      {
        coverageId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-30',
        amount: 100.00
      },
      {
        coverageId: 2,
        startDate: '2024-09-05',
        endDate: '2024-09-25',
        amount: 90.00
      },
      {
        coverageId: 3,
        startDate: '2024-09-10',
        endDate: '2024-09-20',
        amount: 120.00
      },
      {
        coverageId: 4,
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        amount: 110.00
      },
      {
        coverageId: 5,
        startDate: '2024-09-15',
        endDate: '2024-10-15',
        amount: 80.00
      },
      {
        coverageId: 6,
        startDate: '2024-10-01',
        endDate: '2024-10-31',
        amount: 75.00
      },
      {
        coverageId: 7,
        startDate: '2024-11-01',
        endDate: '2024-11-30',
        amount: 130.00
      },
      {
        coverageId: 8,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        amount: 125.00
      },
      {
        coverageId: 9,
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        amount: 115.00
      },
      {
        coverageId: 10,
        startDate: '2024-10-01',
        endDate: '2024-10-15',
        amount: 85.00
      },
      {
        coverageId: 11,
        startDate: '2024-11-01',
        endDate: '2024-11-15',
        amount: 95.00
      },
      {
        coverageId: 12,
        startDate: '2024-12-01',
        endDate: '2024-12-15',
        amount: 105.00
      },
      {
        coverageId: 13,
        startDate: '2024-09-15',
        endDate: '2024-10-15',
        amount: 100.00
      },
      {
        coverageId: 14,
        startDate: '2024-09-10',
        endDate: '2024-09-25',
        amount: 90.00
      },
      {
        coverageId: 15,
        startDate: '2024-08-15',
        endDate: '2024-09-15',
        amount: 120.00
      },
      {
        coverageId: 16,
        startDate: '2024-10-01',
        endDate: '2024-10-31',
        amount: 110.00
      },
      {
        coverageId: 17,
        startDate: '2024-11-01',
        endDate: '2024-11-30',
        amount: 80.00
      },
      {
        coverageId: 18,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        amount: 75.00
      },
      {
        coverageId: 19,
        startDate: '2024-09-05',
        endDate: '2024-09-25',
        amount: 130.00
      },
      {
        coverageId: 20,
        startDate: '2024-09-10',
        endDate: '2024-09-30',
        amount: 125.00
      },
      {
        coverageId: 21,
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        amount: 115.00
      },
      {
        coverageId: 22,
        startDate: '2024-09-15',
        endDate: '2024-10-15',
        amount: 85.00
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prices', null, {});
  }
};
