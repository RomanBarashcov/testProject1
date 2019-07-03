'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Users', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },

      name: {
        type: Sequelize.STRING(30),
        allowNull: false, 

        validate: {
          notEmpty: true
        }
      },

      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        
        validate: {
          notEmpty: true
        }
      },

      password: {
        type: Sequelize.STRING(100),
        allowNull: false,

        validate: {
          notEmpty: true
        }
      },

      stateReason: {
        type: Sequelize.STRING,
      },
  
      stateId: {
        type: Sequelize.INTEGER(10),
        allowNull: false, 
  
        references: {
          model: 'States',
          key: 'id'
        }
      },

      roleId: {
        type: Sequelize.INTEGER(10),
        allowNull: false, 
  
        references: {
          model: 'Roles',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};