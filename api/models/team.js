'use strict';
module.exports = (sequelize, DataTypes) => {

  const Team = sequelize.define('Team', {

    name: { 
      type: DataTypes.STRING, 

      validate: {
        notEmpty: true
      }
    },

    description: { 
      type: DataTypes.STRING, 

      validate: {
        notEmpty: true
      }
    },

    total_score: { 
      type: DataTypes.INTEGER, 

      validate: {
        notEmpty: true
      }
    },

  }, {});

  return Team;
};