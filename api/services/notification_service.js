"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");
const notificationTypeConfiguratorService = require("./notification_type_configurator_service");
const notTypes = require("../const/notifications_types");
const userRoles = require("../const/user_roles");

const getNotifications = async () => {
    try {

        let operationDetails = od();
        const notifications = await repositories.notificationRepository.getNotifications();

        return operationDetails(true, "", notifications);

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

userRegistrationNotification = async (regUser) => {
    try {

        let operationDetails = od();
        const notificationType = notTypes.NEW_USER_WAS_REGISTRATED;

        notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
        let notification = await repositories.notificationRepository.createNotification(regUser, notificationType.id);
            
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const userLiveTeamNotification = async (fromUser, stateId, isLeft) => {
    try {

        let operationDetails = od();
        let notificationType = "";

        const fromUserRole = fromUser["Role.Type"];
        const state = await repositories.stateRepository.getStateById(stateId);

        if(fromUserRole === userRoles.admin) {

            notificationType = notificationTypeConfiguratorService.adminRemovedPlayerFromTeamNotType(isLeft, state.type);

        } else if (fromUserRole === userRoles.manager) {

            notificationType = notificationTypeConfiguratorService.managerRemovedPlayerFromTeamNotType(isLeft, state.type);

        } else if(fromUser === userRoles.player) {

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

        let notification = await repositories.notificationRepository.createNotification(fromUser, notificationType.id);
        
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const userProfileNotification = async (fromUser, userId, isBlock) => {
    try {

        let operationDetails = od();
        let notificationType = "";

        const fromUserRole = fromUser["Role.Type"];
        const userProfile = await repositories.userRepository.getUserById(userId);
        const userRoleProfile = userProfile["Role.Type"];

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

        const notification = await repositories.notificationRepository.createNotification(fromUser, notificationType.id);
        
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const userChangeTeamNotification = (fromUser) => {
    try {

        let operationDetails = od();
        let notificationType = "";

        const fromUserRole = fromUser["Role.Type"];

        notificationType = notificationTypeConfiguratorService.changePlayerTeamNotType(fromUserRole);
        notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);

        const notification = await repositories.notificationRepository.createNotification(fromUser, notificationType.id);

        return operationDetails(true, "", notification);
        
    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

module.exports = {
    getNotifications: getNotifications,
    userLiveTeamNotification: userLiveTeamNotification,
    userProfileNotification: userProfileNotification,
    userChangeTeamNotification: userChangeTeamNotification
}