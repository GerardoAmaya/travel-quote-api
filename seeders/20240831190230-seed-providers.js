module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Providers', [
      {
        name: 'PULLMAN BUS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'TURBUS',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};
