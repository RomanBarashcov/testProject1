const notTypes = require("../const/notifications_types");
const stateTypes = require("../const/state_types");
const userRoles = require("../const/user_roles");

const userProfileAdminNotificationType = (userRole, isBlock) => {

    let notificationType = "";

    if(userRole === userRoles.manager) {

        notificationType = isBlock ? notTypes.ADMIN_BLOCKED_MANAGER : ADMIN_APPROVED_MANAGER_PROFILE;

    } else if(userRole === userRoles.player) {

        notificationType = isBlock ? notTypes.ADMIN_BLOCKED_PLAYER : ADMIN_APPROVED_PLAYER_PROFILE;
    }

    return notificationType;
};

const playerProfileManagerNatificationType = (isBlock) => {

    let notificationType = "";

    if(isBlock) {
        notificationType = notTypes.MANAGER_BLOKED_PLAYER_PROFILE;
    } else {
        notificationType = notTypes.MANAGER_APPROVED_PLAYER_PROFILE;
    }

    return notificationType;
};

const adminRemovedPlayerFromTeamNotType = (isRemoved, state) => {

    let notificationType = "";

    if(isRemoved && state === stateTypes.approve) {

        notificationType = notTypes.ADMIN_REMOVED_PLAYER_FROM_TEAM;

    } else if(!isRemoved && state === stateTypes.approve) {

        notificationType = notTypes.ADMIN_DISAPROVED_LEFT_PLAYER_FROM_TEAM;

    }

    return notificationType;
};

const adminApprovePlayerLeftTeamNotType = () => {

    return notTypes.ADMIN_APPROVED_LEFT_PLAYER_FROM_TEAM;

};

const managerRemovedPlayerFromTeamNotType = (isRemoved, state) => {

    let notificationType = "";

    if(isRemoved && state === stateTypes.approve) {

        notificationType = notTypes.MANAGER_REMOVE_PLAYAER_FROM_TEAM;

    } else if(!isRemoved && state === stateTypes.blocked){

        notificationType = notTypes.MANAGER_DISAPPROVED_LEFT_PLAYER_FROM_TEAM;

    }

    return notificationType;
};

const managerApproveLeftPlayerFromTeamNotType = () => {

    return notTypes.MANAGER_APPROVED_LEFT_PLAYER_TEAM;
}

const playerLiveFromTeamNotType = (isLeft) => {

    let notificationType = "";

    if(isLeft) {
        notificationType = notTypes.PLAYER_LEFT_TEAM;
    } else {
        notificationType = notTypes.PLAYER_DISAPPROVED_LIVE_FROM_TEAM;
    }
    
    return notificationType;
};

const changePlayerTeamNotType = (fromUserRole) => {

    let notificationType = "";

    switch(fromUserRole) {
        case userRoles.admin: notificationType = notTypes.ADMIN_CHANGED_PLAYER_TEAM; break;
        case userRoles.manager: notificationType = notTypes.MANAGER_CHANGED_PLAYER_TEAM; break;
        case userRoles.player: notificationType = notTypes.PLAYER_CHANGING_TEAM; break;
    }
    
    return notificationType;

};

module.exports = {
    userProfileAdminNotificationType: userProfileAdminNotificationType,
    playerProfileManagerNatificationType:  playerProfileManagerNatificationType,
    adminRemovedPlayerFromTeamNotType: adminRemovedPlayerFromTeamNotType,
    adminApprovePlayerLeftTeamNotType: adminApprovePlayerLeftTeamNotType,
    managerRemovedPlayerFromTeamNotType: managerRemovedPlayerFromTeamNotType,
    managerApproveLeftPlayerFromTeamNotType : managerApproveLeftPlayerFromTeamNotType,
    playerLiveFromTeamNotType: playerLiveFromTeamNotType,
    changePlayerTeamNotType: changePlayerTeamNotType
}