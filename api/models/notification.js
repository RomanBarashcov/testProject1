'use strict';
module.exports = (sequelize, DataTypes) => {

  const Notification = sequelize.define('Notification', {

    date: DataTypes.DATE

  }, {});

  Notification.associate = function(models) {
    
   //Notification.hasMany(models.NotificationType);
   // Notification.hasMany(models.User);

  };
  return Notification;
};