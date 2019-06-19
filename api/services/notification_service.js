"use strict"

module.exports = () => {
    
    const db = require("../entities/db");

    const getNotifications = async () => {

        let res = await db.Notification.findAll({raw:true});
        return res;
    };

    const getNotificationById = async (notificationId) => {

        let res = await db.Notification.findByPk(notificationId);
        return res;

    };

    return {
        getNotifications: getNotifications,
        getNotificationById: getNotificationById
    }
};