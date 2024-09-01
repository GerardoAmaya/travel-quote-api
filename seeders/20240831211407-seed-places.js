'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Places', [
      { name: 'New York' },
      { name: 'Los Angeles' },
      { name: 'Chicago' },
      { name: 'Houston' },
      { name: 'Miami' },
      { name: 'Seattle' },
      { name: 'San Francisco' },
      { name: 'Las Vegas' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Places', null, {});
  }
};
