'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vehicles', [
      {
        name: 'Bus dos pisos',
        capacity: 40,
        categoryId: 1, // ID of the "Standard" category
        providerId: 1, // ID of the "PULLMAN BUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bus dos pisos',
        capacity: 8,
        categoryId: 2, // ID of the "Premium" category
        providerId: 1, // ID of the "PULLMAN BUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bus ejecutivo',
        capacity: 32,
        categoryId: 1, // ID of the "Standard" category
        providerId: 1, // ID of the "PULLMAN BUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bus ejecutivo',
        capacity: 10,
        categoryId: 2, // ID of the "Premium" category
        providerId: 1, // ID of the "PULLMAN BUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minivan',
        capacity: 15,
        categoryId: 1, // ID of the "Standard" category
        providerId: 2, // ID of the "TURBUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minivan',
        capacity: 4,
        categoryId: 2, // ID of the "Premium" category
        providerId: 2, // ID of the "TURBUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Autobús turístico',
        capacity: 50,
        categoryId: 1, // ID of the "Standard" category
        providerId: 2, // ID of the "TURBUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Autobús turístico',
        capacity: 10,
        categoryId: 2, // ID of the "Premium" category
        providerId: 2, // ID of the "TURBUS" provider
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
