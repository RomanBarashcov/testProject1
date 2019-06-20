"use strict"

module.exports = (sequelize, DataTypes) => {

    const User = require("./user")(sequelize, DataTypes);
    const NotificationType = require("./notification_type")(sequelize, DataTypes);
    
    const Notification = sequelize.define('notifications', {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      typeId: {
          type: DataTypes.INTEGER(10),
          allowNull: false,

          references: {
            model: NotificationType,
            key: 'id'
          }
      },
      date: {
          type: DataTypes.DATE,
          allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,

        references: {
          model: User,
          key: 'id'
        }
    }
    });
  
    return Notification;
}