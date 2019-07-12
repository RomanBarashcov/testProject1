'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('TeamPlayers', [{
        userId: 2,
        teamId: 1,
        prev_teamId: 1,
        fromUserId: 2,
        stateId: 1
      }, {
        userId: 3,
        teamId: 1,
        prev_teamId: 1,
        fromUserId: 3,
        stateId: 1
      }, {
        userId: 4,
        teamId: 1,
        prev_teamId: 1,
        fromUserId: 4,
        stateId: 1
      }, {
        userId: 5,
        teamId: 2,
        prev_teamId: 2,
        fromUserId: 5,
        stateId: 1
      }, {
        userId: 6,
        teamId: 2,
        prev_teamId: 2,
        fromUserId: 6,
        stateId: 1
      }, {
        userId: 7,
        teamId: 2,
        prev_teamId: 2,
        fromUserId: 7,
        stateId: 1
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('TeamPlayers', null, {});

  }
};
