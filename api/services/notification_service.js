"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");

const getNotifications = async () => {
    try {

        let operationDetails = od();
        let notifications = await repositories.notificationRepository.getNotifications();

        operationDetails = od(true, "", notifications);
        return operationDetails;

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getNotificationById = async (notificationId) => {
    try {

        let operationDetails = od();
        let notification = await repositories.notificationRepository.getNotificationById(notificationId);
        
        operationDetails = od(true, "", notification);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }

};

const createNotification = async (fromUserId, type) => {
    try {

        let operationDetails = od();
        let notification = await repositories.notificationRepository.createNotification();
        
        operationDetails = od(true, "", notification);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }

};

module.exports = {
    getNotifications: getNotifications,
    getNotificationById: getNotificationById,
    createNotification: createNotification
}