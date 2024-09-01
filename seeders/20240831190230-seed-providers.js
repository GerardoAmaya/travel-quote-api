module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Providers', [
      {
        name: 'PULLMAN BUS'
      },
      {
        name: 'TURBUS'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};
