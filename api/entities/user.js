"use strict"

module.exports = (sequelize, DataTypes) => {

  const State = require("./state")(sequelize, DataTypes);
  const Role = require("./role")(sequelize, DataTypes);

  const User = sequelize.define('users', {
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
    email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    stateId: {
      type: DataTypes.INTEGER(10),
      allowNull: false, 

      references: {
        model: State,
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER(10),
      allowNull: false, 

      references: {
        model: Role,
        key: 'id'
      }
    },
    
  });

  return User;

}