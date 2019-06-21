'use strict';
module.exports = (sequelize, DataTypes) => {

  const TeamPlayer = sequelize.define('TeamPlayers', {

    userId: { 
      type:DataTypes.INTEGER(10),
      alloNull: false,

      references: {
        model: 'Users',
        key: 'id'
      }
    },

    teamId: {
      type: DataTypes.INTEGER(10),
      alloNull: false,

      references: {
        model: 'Teams',
        key: 'id'
      }
    }
    
  }, {});

  return TeamPlayer;
};