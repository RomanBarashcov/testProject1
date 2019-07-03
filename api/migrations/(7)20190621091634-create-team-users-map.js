'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('TeamPlayers', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },

      userId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,

        references: {
          model: 'Users',
          key: 'id'
        }
      },

      teamId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,

        references: {
          model: 'Teams',
          key: 'id'
        }
      },

      prev_teamId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      }, 

      stateId: {
        type: Sequelize.INTEGER(10),
        allowNull: false, 
  
        references: {
          model: 'States',
          key: 'id'
        }
      },

      is_left: {
        type: Sequelize.BOOLEAN,
      },

      reason_left: {
        type: Sequelize.STRING,
      }
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TeamPlayers');
  }
};