'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      return await queryInterface.bulkInsert('Teams', 
      [{name: "Team A", description: "Team A ... from ... and ...", total_score: 20}, 
       {name: "Team B", description: "Team B ... from ... and ...", total_score: 10}], {});

  },

  down: async (queryInterface, Sequelize) => {

      return await queryInterface.bulkDelete('Teams', null, {});

  }
};
