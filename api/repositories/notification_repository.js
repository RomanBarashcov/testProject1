"use strict"

const db = require("../models/index");

const getNotifications = async () => {
    try {

        const notifications = await db.Notification.findAll({raw:true,
            attributes:[
                "id",
                "date"
            ],
            include: [{
                attributes: ["id", "type", "message"],
                model: db.NotificationType,
                required: false
            },{
                attributes: ["id", "email"],
                model: db.User,
                required: false
            }]
        });

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

const createNotification = async (userId, typeId) => {
    try {

        const notification = await db.Notification.create({NotificationTypeId: typeId, UserId: userId, date: new Date()});
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