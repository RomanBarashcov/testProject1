"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");
const notTypes = require("../const/notifications_types");

const getUsers = async () => {
    try {

        let operationDetails = od();
        const users = await repositories.userRepository.getUsers();

        operationDetails = od(true, "", users);
        return operationDetails;

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getUserById = async (userId) => {
    try {

        let operationDetails = od();
        const user = await repositories.userRepository.getUserById(userId);

        operationDetails = od(true, "", user);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const updateUserTeam = async (fromUser, userId, teamId) => {
    try {

        let operationDetails = od();
        let notificationType = "";

        if(fromUser["Role.Type"] === "admin"){
            notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notTypes.ADMIN_CHANGED_PLAYER_TEAM);
        } else if(fromUser["Role.Type"] === "manager") {
            notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notTypes.MANAGER_APPROVED_CHANGE_PLAYER_TEAM);
        } else if(fromUser["Role.Type"] === "player") {
            notificationType = await repositories.notificationTypeRepository.getNotificationTypeByType(notTypes.PLAYER_WANT_CHANGING_TEAM);
        }

        await repositories.notificationRepository.createNotification(fromUser, notificationType.id);
        await repositories.userRepository.updateUserTeam(userId, teamId);
       
        operationDetails = od(true);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};


module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updateUserTeam: updateUserTeam
};