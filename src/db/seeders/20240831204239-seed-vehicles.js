module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vehicles', [
      {
        name: 'Bus dos pisos',
        capacity: 40,
        categoryId: 1, // ID of the "Standard" category
        providerId: 1 // ID of the "PULLMAN BUS" provider
      },
      {
        name: 'Bus dos pisos V3',
        capacity: 8,
        categoryId: 2, // ID of the "Premium" category
        providerId: 1 // ID of the "PULLMAN BUS" provider
      },
      {
        name: 'Bus ejecutivo V5',
        capacity: 32,
        categoryId: 1, // ID of the "Standard" category
        providerId: 1 // ID of the "PULLMAN BUS" provider
      },
      {
        name: 'Bus ejecutivo V6',
        capacity: 10,
        categoryId: 2, // ID of the "Premium" category
        providerId: 1 // ID of the "PULLMAN BUS" provider
      },
      {
        name: 'Minivan',
        capacity: 15,
        categoryId: 1, // ID of the "Standard" category
        providerId: 2 // ID of the "TURBUS" provider
      },
      {
        name: 'Minivan V2',
        capacity: 4,
        categoryId: 2, // ID of the "Premium" category
        providerId: 2 // ID of the "TURBUS" provider
      },
      {
        name: 'Autobús turístico V2',
        capacity: 50,
        categoryId: 1, // ID of the "Standard" category
        providerId: 2 // ID of the "TURBUS" provider
      },
      {
        name: 'Autobús turístico V5',
        capacity: 10,
        categoryId: 2, // ID of the "Premium" category
        providerId: 2 // ID of the "TURBUS" provider
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
