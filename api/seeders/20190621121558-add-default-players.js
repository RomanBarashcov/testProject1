'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const bcrypt = require("bcrypt");
    const passwordSalt = require("../config/sec.conf")().passwordSalt;

    let password = bcrypt.hashSync("123456", passwordSalt);

    return await queryInterface.bulkInsert('Users', [{
        name: 'Player 1',
        email: 'player1@mail.com',
        password: password,
        roleId: 3,
        stateId: 1
    }, {
        name: 'Player 2',
        email: 'player2@mail.com',
        password: password,
        roleId: 3,
        stateId: 1
    }, {
        name: 'Player 3',
        email: 'player3@mail.com',
        password: password,
        roleId: 3,
        stateId: 1
    }, {
        name: 'Player 4',
        email: 'player4@mail.com',
        password: password,
        roleId: 3,
        stateId: 1
    }, {
        name: 'Player 5',
        email: 'player5@mail.com',
        password: password,
        roleId: 3,
        stateId: 1
    }, {
        name: 'Player 6',
        email: 'player6@mail.com',
        password: password,
        roleId: 3,
        stateId: 1
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    return await queryInterface.bulkDelete('Users', null, {});

  }
};
