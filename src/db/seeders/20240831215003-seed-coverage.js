module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Coverages', [
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 1,
        startTime: '08:00:00',
        durationHours: 5
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 1,
        startTime: '09:00:00',
        durationHours: 5
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 2,
        providerId: 1,
        startTime: '08:00:00',
        durationHours: 6
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 2,
        providerId: 1,
        startTime: '09:00:00',
        durationHours: 6
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 2,
        startTime: '08:00:00',
        durationHours: 4
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 2,
        startTime: '09:00:00',
        durationHours: 4
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 2,
        providerId: 2,
        startTime: '08:00:00',
        durationHours: 5
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 2,
        providerId: 2,
        startTime: '09:00:00',
        durationHours: 5
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 3,
        startTime: '08:00:00',
        durationHours: 7
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 3,
        startTime: '09:00:00',
        durationHours: 7
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 2,
        providerId: 3,
        startTime: '08:00:00',
        durationHours: 6
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 2,
        providerId: 3,
        startTime: '09:00:00',
        durationHours: 6
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 4,
        startTime: '08:00:00',
        durationHours: 4
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 4,
        startTime: '09:00:00',
        durationHours: 4
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 2,
        providerId: 4,
        startTime: '08:00:00',
        durationHours: 5
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 2,
        providerId: 4,
        startTime: '09:00:00',
        durationHours: 5
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 5,
        startTime: '08:00:00',
        durationHours: 3
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 5,
        startTime: '09:00:00',
        durationHours: 3
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 2,
        providerId: 5,
        startTime: '08:00:00',
        durationHours: 4
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 2,
        providerId: 5,
        startTime: '09:00:00',
        durationHours: 4
      },
      {
        originPlaceId: 1,
        destinationPlaceId: 2,
        vehicleId: 1,
        providerId: 6,
        startTime: '08:00:00',
        durationHours: 6
      },
      {
        originPlaceId: 2,
        destinationPlaceId: 1,
        vehicleId: 1,
        providerId: 6,
        startTime: '09:00:00',
        durationHours: 6
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Coverages', null, {});
  }
};
