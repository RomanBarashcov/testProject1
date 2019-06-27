'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {

    const bcrypt = require("bcrypt");
    const passwordSalt = require("../config/sec.conf").passwordSalt;

    let password = bcrypt.hashSync("123456", passwordSalt);

    return await queryInterface.bulkInsert('Users', [{
        name: 'Super Admin',
        email: 'superadmin@mail.com',
        password: password,
        roleId: 1,
        stateId: 1
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

      return await queryInterface.bulkDelete('Users', null, {});

  }
};
