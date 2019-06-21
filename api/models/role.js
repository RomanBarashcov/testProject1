'use strict';
module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {

    type: { 
      type: DataTypes.STRING, 

      validate: {
        notEmpty: true
      }
    }

  }, {});

  Role.associate = function(models) {

    Role.belongsTo(models.User);

  };

  return Role;
};