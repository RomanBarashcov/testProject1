"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");
const notificationTypeConfiguratorService = require("./notification_type_configurator_service");

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

const getNotificationById = async (notificationId) => {
    try {

        let operationDetails = od();
        const notification = await repositories.notificationRepository.getNotificationById(notificationId);
        
        return operationDetails(true, "", notification);;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }

};

const userLiveTeamNotification = async (fromUser, isLeft) => {
    try {

        let operationDetails = od();
        let notificationType = "";

        const fromUserRole = fromUser["Role.Type"];

        if(fromUserRole === "admin") {
            notificationType = notificationTypeConfiguratorService.adminRemovedPlayerFromTeamNotType(isLeft);
        } else if (fromUserRole === "manager") {
            notificationType = notificationTypeConfiguratorService.managerRemovedPlayerFromTeamNotType(isLeft);
        } else if(fromUser === "player") {
            notificationType = notificationTypeConfiguratorService.playerLiveFromTeamNotType(isLeft);
        }

        switch(fromUserRole) {
            case "admin":
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
            case "manager":
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
            case "player":
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
                default: break;
        }

        let notification = repositories.notificationRepository.createNotification(fromUser, notificationType.id);
        
        return operationDetails(true, "", notification);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const userBlockNotification = async (fromUser, userId, isBlock) => {
    try {

        let operationDetails = od();
        let notificationType = "";

        const fromUserRole = fromUser["Role.Type"];
        const blockedUser = await repositories.userRepository.getUserById(userId);
        const blockdeUserRole = blockedUser["Role.Type"];

        const isHasPermissions = isBlockingPermissions(fromUser, blockdeUserRole);
        if(!isHasPermissions.permissions) return operationDetails(false, isHasPermissions.message, null);

        if(fromUserRole === "admin") {
            notificationType = notificationTypeConfiguratorService.adminUserBlockNotificationType(blockdeUserRole, isBlock);
        } else if (fromUserRole === "manager") {
            notificationType = notificationTypeConfiguratorService.managerPlayerBlockNatificationType(isBlock);
        }

        switch(fromUserRole) {
            case "admin":
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
            case "manager":
                    notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notificationType);
                    break;
                default: break;
        }

        const notification = repositories.notificationRepository.createNotification(fromUser, notificationType.id);
        
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

        const notification = repositories.notificationRepository.createNotification(fromUser, notificationType.id);

        return operationDetails(true, "", notification);
        
    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const isBlockingPermissions = (fromUserRole, blockdeUserRole) => {

    let data = {};

    if(fromUserRole === blockdeUserRole) {

        data = {permissions: false, message: "You can't blocking user with the same role"};

     } else if(fromUserRole === "player" && blockdeUserRole === "admin") {

        data = {permissions: false, message: "You can't blocking admin with player role"};

     } else if(fromUserRole === "manager" && blockdeUserRole === "admin") {

        data = {permissions: false, message: "You can't blocking admin with manager role"};

     } else {

         data = {permissions: true, message: ""};
     }

     return data;
};

module.exports = {
    getNotifications: getNotifications,
    getNotificationById: getNotificationById,
    createNotification: createNotification,
    userLiveTeamNotification: userLiveTeamNotification,
    userBlockNotification: userBlockNotification,
    userChangeTeamNotification: userChangeTeamNotification
}