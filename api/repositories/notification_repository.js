"use strict"

const db = require("../models/index");

const getNotifications = async () => {
    try {

        return await db.Notification.findAll({raw:true});

   } catch(err) {
       console.error(err);
       return [];
   }
};

const getNotificationById = async (notificationId) => {
    try {

        return await db.Notification.findByPk(notificationId);

    } catch(err) {
        console.error(err);
        return [];
    }
};

const createNotification = async (fromUserId, type) => {
    try {

        return await db.Notification.create({type: type, userId: fromUserId, date: new Date()});

    } catch(err) {
        console.error(err);
        return [];
    }
};

module.exports = {
    getNotifications: getNotifications,
    getNotificationById: getNotificationById,
    createNotification: createNotification
}