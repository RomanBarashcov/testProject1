'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('NotificationTypes', [{
        type: "ADMIN_BLOCKED_MANAGER",
        message: "Admin bloked manager"
      },{
        type: "ADMIN_BLOCKED_PLAYER",
        message: "Admin blocked player"
      },{
        type: "ADMIN_APPROVED_MANAGER_PROFILE",
        message: "Admin approved manager profile"
      }, {
        type: "ADMIN_APPROVED_PLAYER_PROFILE",
        message: "Admin approved player profile"
      },{
        type: "ADMIN_REMOVED_PLAYER_FROM_TEAM",
        message: "Admin removed player from team"
      },{
        type: "ADMIN_DISAPROVED_LEFT_PLAYER_FROM_TEAM",
        message: "Admin disaproved left player from team"
      },{
        type: "ADMIN_CHANGED_PLAYER_TEAM",
        message: "Admin changed player team"
      },{
        type: "MANAGER_APPROVED_PLAYER_PROFILE",
        message: "Manager approved player profile"
      },{
        type: "MANAGER_APPROVED_CHANGE_PLAYER_TEAM",
        message: "Manager approved changing player team"
      },{
        type: "MANAGER_APPROVED_LEFT_PLAYER_TEAM",
        message: "Manager approved left player team"
      },{
        type: "MANAGER_BLOCKED_PLAYER_PROFILE",
        message: "Manager blocked player profile"
      },{
        type: "MANAGER_DISAPPROVED_CHANGE_PLAYER_TEAM",
        message: "Manager disapproved change player team"
      },{
        type: "MANAGER_DISAPPROVED_LEFT_PLAYER_FROM_TEAM",
        message: "Manager disapproved left player from team"
      },{
        type: "MANAGER_REMOVE_PLAYAER_FROM_TEAM",
        message: "Manager remove player from team"
      },{
        type: "PLAYER_CHANGING_TEAM",
        message: "Player changing team"
      },{
        type: "PLAYER_LEFT_TEAM",
        message: "Player left team"
      },{
        type: "PLAYER_DISAPPROVED_CHANGING_TEAM",
        message: "Player disapproved changing team"
      },{
        type: "PLAYER_DISAPPROVED_LIVE_FROM_TEAM",
        message: "Player disapproved live from team"
      },{
        type: "NEW_USER_WAS_REGISTRATED",
        message: "New user was registrated"
      }
  ]
    , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NotificationTypes', null, {});
  }
};
