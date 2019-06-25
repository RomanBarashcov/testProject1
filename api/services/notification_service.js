"use strict"

const db = require("../models/index");

const getNotifications = async () => {

    let notifications = await db.Notification.findAll({raw:true});
    return notifications;
};

const getNotificationById = async (notificationId) => {

    let notification = await db.Notification.findByPk(notificationId);
    return notification;

};

module.exports = {
    getNotifications: getNotifications,
    getNotificationById: getNotificationById
}