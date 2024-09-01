module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Providers', [
      {
        name: 'PULLMAN BUS'
      },
      {
        name: 'TURBUS'
      },
      {
        name: 'SV BUS'
      },
      {
        name: 'BUS VIANCA'
      },
      {
        name: 'BUS JAC'
      },
      {
        name: 'BUS DEL SUR'
      },
      {
        name: 'BUS NORTE'
      },
      {
        name: 'BUS CROMOSV'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};
