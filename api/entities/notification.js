"use strict"

module.exports = (sequelize, DataTypes) => {

    const User = require("./user")(sequelize, DataTypes);

    const Notification = sequelize.define('notifications', {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      type: {
          type: DataTypes.STRING(30),
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