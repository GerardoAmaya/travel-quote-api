'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Quotations', [
      {
        userId: 1,
        originPlaceId: 1,
        destinationPlaceId: 2,
        date: '2024-09-15',
        passengerCount: 4,
        coverageId: 1,
        priceId: 1
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 3,
        date: '2024-09-20',
        passengerCount: 2,
        coverageId: 2,
        priceId: 2
      },
      {
        userId: 2,
        originPlaceId: 1,
        destinationPlaceId: 3,
        date: '2024-09-25',
        passengerCount: 6,
        coverageId: 1,
        priceId: 2
      },
      {
        userId: 2,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-09-30',
        passengerCount: 3,
        coverageId: 2,
        priceId: 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Quotations', null, {});
  }
};
