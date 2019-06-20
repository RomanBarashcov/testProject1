"use strict"

module.exports = (sequelize, DataTypes) => {

    const NotificationType = sequelize.define('notification_types', {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
          type: DataTypes.STRING(30),
          allowNull: false
      }
    });
  
    return NotificationType;
}