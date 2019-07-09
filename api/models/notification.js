'use strict';
module.exports = (sequelize, DataTypes) => {

  const Notification = sequelize.define('Notification', {

    date: {
      type: DataTypes.DATE,
      allowNull: false,

      validate: {
        notEmpty: true
      }
    },

  }, {});

  Notification.associate = function(models) {

    Notification.belongsTo(models.NotificationType);
    Notification.belongsTo(models.User);
 
  };

  return Notification;
};