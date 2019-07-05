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

     //NotificationType.belongsTo(models.Notification);
    
  }

  return NotificationType;
};