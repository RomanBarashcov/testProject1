"use strict"

module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define('teams', {
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
  
    return Role;
}