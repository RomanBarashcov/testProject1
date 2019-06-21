'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teams', {

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

      description: {
        type: Sequelize.STRING(100),
        allowNull: false, 
        
        validate: {
          notEmpty: true
        }
      },

      total_score: {
        type: Sequelize.INTEGER(10),
        allowNull: false, 
        
        validate: {
          notEmpty: true
        }
      }
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teams');
  }
};