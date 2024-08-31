'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Places', [
      { name: 'New York', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Los Angeles', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chicago', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Houston', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Miami', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Seattle', createdAt: new Date(), updatedAt: new Date() },
      { name: 'San Francisco', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Las Vegas', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Places', null, {});
  }
};
