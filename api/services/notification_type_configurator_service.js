const notTypes = require("../const/notifications_types");

const adminUserBlockNotificationType = (blockdeUserRole, isBlock) => {

    let notificationType = "";

    switch(blockdeUserRole && isBlock) { 
        case "manager": notificationType = notTypes.ADMIN_BLOCKED_MANAGER; break;
        case "player": notificationType = notTypes.ADMIN_BLOCKED_MANAGER; break;
        default: break;
    }

    switch(blockdeUserRole && !isBlock) { 
        case "manager": notificationType = notTypes.ADMIN_APPROVED_MANAGER_PROFILE; break;
        case "player": notificationType = notTypes.ADMIN_APPROVED_PLAYER_PROFILE; break;
        default: break;
    }

    return notificationType;
};

const managerPlayerBlockNatificationType = (isBlock) => {

    let notificationType = "";

    if(isBlock) {
        notificationType = notTypes.MANAGER_BLOKED_PLAYER_PROFILE;
    } else {
        notificationType = notTypes.MANAGER_APPROVED_PLAYER_PROFILE;
    }

    return notificationType;
};

const adminRemovedPlayerFromTeamNotType = (isRemoved) => {

    let notificationType = "";

    if(isRemoved) {
        notificationType = notTypes.ADMIN_REMOVED_PLAYER_FROM_TEAM;
    } else {
        notificationType = notTypes.ADMIN_DISAPROVED_LEFT_PLAYER_FROM_TEAM
    }

    return notificationType;
};

const managerRemovedPlayerFromTeamNotType = (isRemoved) => {

    let notificationType = "";

    if(isRemoved) {
        notificationType = notTypes.MANAGER_REMOVE_PLAYAER_FROM_TEAM;
    } else {
        notificationType = notTypes.MANAGER_DISAPPROVED_LEFT_PLAYER_FROM_TEAM;
    }

    return notificationType;
};

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

    switch(fromUserRole){
        case "admin": notificationType = notTypes.ADMIN_CHANGED_PLAYER_TEAM; break;
        case "manager": notificationType = notTypes.MANAGER_CHANGED_PLAYER_TEAM; break;
        case "player": notificationType = notTypes.PLAYER_CHANGING_TEAM; break;
    }
    
    return notificationType;

};

module.exports = {
    adminUserBlockNotificationType: adminUserBlockNotificationType,
    managerPlayerBlockNatificationType: managerPlayerBlockNatificationType,
    adminRemovedPlayerFromTeamNotType: adminRemovedPlayerFromTeamNotType,
    managerRemovedPlayerFromTeamNotType: managerRemovedPlayerFromTeamNotType,
    playerLiveFromTeamNotType: playerLiveFromTeamNotType,
    changePlayerTeamNotType: changePlayerTeamNotType
}