"use strict"

module.exports = (sequelize, DataTypes) => {

    const Team = sequelize.define('teams', {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
          type: DataTypes.STRING(30),
          allowNull: false
      },
      description: {
        type: DataTypes.STRING(30),
          allowNull: false
      },
      total_score: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      }
    });
  
    return Team;
}