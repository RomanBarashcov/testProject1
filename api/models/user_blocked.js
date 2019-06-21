'use strict';
module.exports = (sequelize, DataTypes) => {

  const UserBlocked = sequelize.define('UserBlocked', {

    reason: DataTypes.STRING,
    
  }, {});

  UserBlocked.associate = function(models) {

    //UserBlocked.hasOne(models.User);

  };
  
  return UserBlocked;
};