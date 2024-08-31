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
        durationHours: 5.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coverages', null, {});
  }
};
