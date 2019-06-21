'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {

   return await queryInterface.bulkInsert('Roles', [{type: 'admin'}, {type: 'manager'}, {type: 'player'}], {});

  },

  down: async (queryInterface, Sequelize) => {

      return await queryInterface.bulkDelete('Roles', null, {});

  }
};
