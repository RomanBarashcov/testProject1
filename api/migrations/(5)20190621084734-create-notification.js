'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Notifications', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },

      typeId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,

        references: {
          model: 'NotificationTypes',
          key: 'id'
        }
      },

      date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Notifications');
  }
};