
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Quotations', [
      {
        userId: 1,
        originPlaceId: 1,
        destinationPlaceId: 2,
        date: '2024-09-15',
        passengerCount: 4
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 3,
        date: '2024-09-20',
        passengerCount: 2
      },
      {
        userId: 1,
        originPlaceId: 1,
        destinationPlaceId: 3,
        date: '2024-09-25',
        passengerCount: 6
      },
      {
        userId: 1,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-09-30',
        passengerCount: 10
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 3,
        date: '2024-10-05',
        passengerCount: 10
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 1,
        date: '2024-10-10',
        passengerCount: 15
      },
      {
        userId: 1,
        originPlaceId: 1,
        destinationPlaceId: 3,
        date: '2024-10-15',
        passengerCount: 6
      },
      {
        userId: 1,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-10-20',
        passengerCount: 3
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 3,
        date: '2024-10-25',
        passengerCount: 4
      },
      {
        userId: 1,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-10-30',
        passengerCount: 2
      },
      {
        userId: 1,
        originPlaceId: 1,
        destinationPlaceId: 3,
        date: '2024-11-05',
        passengerCount: 6
      },
      {
        userId: 1,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-11-10',
        passengerCount: 3
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 3,
        date: '2024-11-15',
        passengerCount: 4
      },
      {
        userId: 1,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-11-20',
        passengerCount: 2
      },
      {
        userId: 1,
        originPlaceId: 1,
        destinationPlaceId: 3,
        date: '2024-11-25',
        passengerCount: 6
      },
      {
        userId: 1,
        originPlaceId: 3,
        destinationPlaceId: 1,
        date: '2024-11-30',
        passengerCount: 3
      },
      {
        userId: 1,
        originPlaceId: 2,
        destinationPlaceId: 3,
        date: '2024-12-05',
        passengerCount: 4
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Quotations', null, {});
  }
};
