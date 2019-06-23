'use strict';
module.exports = (sequelize, DataTypes) => {

  const State = sequelize.define('State', {

    type: { 
      type: DataTypes.STRING, 

      validate: {
        notEmpty: true
      }
    }

  }, {});

  State.associate = function(models) {

    State.hasOne(models.User);

  };

  return State;
};