'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('TeamPlayers', [{
        userId: 2,
        teamId: 1,
      }, {
        userId: 3,
        teamId: 1,
      }, {
        userId: 4,
        teamId: 1,
      }, {
        userId: 5,
        teamId: 2,
      }, {
        userId: 6,
        teamId: 2,
      }, {
        userId: 7,
        teamId: 2,
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('TeamPlayers', null, {});

  }
};
