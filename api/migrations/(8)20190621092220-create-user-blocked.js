'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('UserBlockeds', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },

      reason: {
        type: Sequelize.STRING(30),
        allowNull: false,

        validate: {
          notEmpty: true
        }
      },

      userId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,

        references: {
          model: 'Users',
          key: 'id'
        }
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBlockeds');
  }
};