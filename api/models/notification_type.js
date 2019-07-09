'use strict';
module.exports = (sequelize, DataTypes) => {

  const NotificationType = sequelize.define('NotificationType', {

    type: { 
      type: DataTypes.STRING, 

      validate: {
        notEmpty: true
      }
    },
    
    message: {
      type: DataTypes.STRING, 

      validate: {
        notEmpty: true
      }
    }

  }, {});

  NotificationType.associate = function(models) {

    NotificationType.hasMany(models.Notification);
    
  }

  return NotificationType;
};