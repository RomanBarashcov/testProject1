'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    name: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    stateReason: {
      allowNull: false,
      type: DataTypes.STRING,
    }


  }, {});

  User.associate = function(models) {

    User.belongsTo(models.State);
    User.belongsTo(models.Role);

    User.hasMany(models.Notification);

    User.belongsToMany(models.Team, {
      through: { 
        model: models.TeamPlayers
      }
    });
 
  };
  
  return User;
};