'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('NotificationTypes', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },

      type: {
        type: Sequelize.STRING(50),
        allowNull: false,

        validate: {
          notEmpty: true
        }
      },

      message: {
        type: Sequelize.STRING(50),
        allowNull: false,

        validate: {
          notEmpty: true
        }
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NotificationTypes');
  }
};