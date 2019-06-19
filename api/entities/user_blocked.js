"use strict"

module.exports = (sequelize, DataTypes) => {

  const User = require("./user")(sequelize, DataTypes);

    const UserBlocked = sequelize.define('user_blockeds', {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      reason: {
        type: DataTypes.STRING,
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
  
    return UserBlocked;
}