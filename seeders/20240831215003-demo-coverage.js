'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Coverages', [
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 1,
        startTime: '08:00:00',
        durationHours: 5.5
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 1,
        startTime: '09:00:00',
        durationHours: 5.5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coverages', null, {});
  }
};
