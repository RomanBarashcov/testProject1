"use strict"

module.exports = () => {
    
    const db = require("../entities/db");

    const getNotifications = async () => {

        let notifications = await db.Notification.findAll({raw:true});
        return notifications;
    };

    const getNotificationById = async (notificationId) => {

        let notification = await db.Notification.findByPk(notificationId);
        return notification;

    };

    return {
        getNotifications: getNotifications,
        getNotificationById: getNotificationById
    }
};