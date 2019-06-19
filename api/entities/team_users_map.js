"use strict"

module.exports = (sequelize, DataTypes) => {

    const Team = require("./team")(sequelize, DataTypes);
    const User = require("./user")(sequelize, DataTypes);

    const TeamUsersMap = sequelize.define('team_users_map', {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      teamId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,

        references: {
            model: Team,
            key: 'id'
        }
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
  
    return TeamUsersMap;
}