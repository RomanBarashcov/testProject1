'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await queryInterface.bulkInsert('States', [{ type: 'approve' }, { type: 'pending' }, { type: 'blocked' }], {});

  },

  down: async (queryInterface, Sequelize) => {

      return await queryInterface.bulkDelete('States', null, {});

  }
};
