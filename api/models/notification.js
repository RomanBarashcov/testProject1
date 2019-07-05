'use strict';
module.exports = (sequelize, DataTypes) => {

  const Notification = sequelize.define('Notification', {

    typeId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,

      references: {
        model: 'NotificationTypes',
        key: 'id'
      }
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,

      validate: {
        notEmpty: true
      }
    },

    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,

      references: {
        model: 'Users',
        key: 'id'
      }
    }

  }, {});

  return Notification;
};