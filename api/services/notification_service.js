"use strict"

const db = require("../models/index");
var od = require("../infrastructure/operation_details");

const getNotifications = async () => {
    try {

        let operationDetails = od();
        let notifications = await db.Notification.findAll({raw:true});

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
        let notification = await db.Notification.findByPk(notificationId);
        
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
        let notification = await db.Notification.create(notificationId);
        
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