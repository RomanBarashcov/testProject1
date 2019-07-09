"use strict"

const db = require("../models/index");

const getNotifications = async () => {
    try {
        debugger;
        const notifications = await db.Notification.findAll({raw:true,

            include: [{all: true}]
        });
        debugger;
        return notifications;

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

const createNotification = async (fromUserId, typeId) => {
    try {

        const notification = await db.Notification.create({notificationTypeId: typeId, userId: fromUserId, date: new Date()});
        return notification.dataValues;

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