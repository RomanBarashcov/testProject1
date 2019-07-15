"use strict"

const repositories = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");
const notificationTypeConfiguratorService = require("./notification_type_configurator_service");
const notTypes = require("../const/notifications_types");
const userRoles = require("../const/user_roles");

const getNotifications = async () => {
    try {

        const notifications = await repositories.notificationRepository.getNotifications();
        return operationDetails(true, "", notifications);

   } catch(err) {
       console.error(err);
       return operationDetails(false);
   }
};

const userRegistrationNotification = async (regUser) => {
    try {

        let notificationType = notTypes.NEW_USER_WAS_REGISTRATED;

        notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
        let notification = await repositories.notificationRepository.createNotification(regUser, notificationType.id);
            
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const userLiveTeamNotification = async (fromUser, playerId, stateId, isLeft) => {
    try {

        let notificationType = "";

        const state = await repositories.stateRepository.getStateById(stateId);
        const player = await repositories.userRepository.getUserById(playerId);

        const fromUserRole = fromUser["Role.type"];
        const operationUserId = player["Teams.TeamPlayers.fromUserId"];

        if(fromUserRole === userRoles.admin) {

            if(operationUserId === fromUser.id) {
                notificationType = notificationTypeConfiguratorService.adminRemovedPlayerFromTeamNotType(isLeft, state.type);
            } else {
                notificationType = notificationTypeConfiguratorService.adminApprovePlayerLeftTeamNotType();
            }
            
        } else if (fromUserRole === userRoles.manager) {

            if(operationUserId === fromUser.id) {
                notificationType = notificationTypeConfiguratorService.managerRemovedPlayerFromTeamNotType(isLeft, state.type);
            } else {
                notificationType = notificationTypeConfiguratorService.managerApproveLeftPlayerFromTeamNotType();
            }

        } else if(fromUserRole === userRoles.player) {

            notificationType = notificationTypeConfiguratorService.playerLiveFromTeamNotType(isLeft);

        }

        switch(fromUserRole) {
            case userRoles.admin:
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
            case userRoles.manager:
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
            case userRoles.player:
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
                default: break;
        }

        let notification = await repositories.notificationRepository.createNotification(fromUser.id, notificationType.id);
        
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const userProfileNotification = async (fromUser, userId, isBlock) => {
    try {

        let notificationType = "";

        const fromUserRole = fromUser["Role.type"];
        const userProfile = await repositories.userRepository.getUserById(userId);
        const userRoleProfile = userProfile["Role.type"];

        if(fromUserRole === userRoles.admin) {

            notificationType = notificationTypeConfiguratorService.userProfileAdminNotificationType(userRoleProfile, isBlock);

        } else if (fromUserRole === userRoles.manager) {

            notificationType = notificationTypeConfiguratorService.playerProfileManagerNatificationType(isBlock);
        }

        switch(fromUserRole) {
            case userRoles.admin:
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
            case userRoles.player:
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
                default: break;
        }

        const notification = await repositories.notificationRepository.createNotification(userId, notificationType.id);
        
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const userChangeTeamNotification = async (fromUser, playerId) => {
    try {

        let notificationType = "";

        const fromUserRole = fromUser["Role.type"];

        notificationType = notificationTypeConfiguratorService.changePlayerTeamNotType(fromUserRole);
        notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);

        const notification = await repositories.notificationRepository.createNotification(playerId, notificationType.id);

        return operationDetails(true, "", notification);
        
    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

module.exports = {
    getNotifications: getNotifications,
    userRegistrationNotification: userRegistrationNotification,
    userLiveTeamNotification: userLiveTeamNotification,
    userProfileNotification: userProfileNotification,
    userChangeTeamNotification: userChangeTeamNotification
}