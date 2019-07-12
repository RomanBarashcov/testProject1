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
    },

    prev_teamId: {
      type: DataTypes.INTEGER(10),
      alloNull: false
    },

    fromUserId: { 
      type:DataTypes.INTEGER(10),
      alloNull: false,

      references: {
        model: 'Users',
        key: 'id'
      }
    },

    stateId: {
      type: DataTypes.INTEGER(10),
      allowNull: false, 

      references: {
        model: 'States',
        key: 'id'
      }
    },

    is_left: {
      type: DataTypes.BOOLEAN,
    },

    reason_left: {
      type: DataTypes.STRING,
    }

  }, {});

  return TeamPlayer;
};