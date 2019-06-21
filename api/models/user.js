'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    name: { 
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },

    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },


  }, {});

  User.associate = function(models) {

    User.hasMany(models.State, {foreignKey: "userId"});
    User.hasMany(models.Role, {foreignKey: "roleId"});

   /* User.hasOne(models.Team, {
      through: 'TeamPlayer',
      as: 'teams',
      foreignKey: 'userId'
    });
 */
  };
  
  return User;
};