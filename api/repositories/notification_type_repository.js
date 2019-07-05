"use strict"

const db = require("../models/index");

const getNotificationTypeByType = async (type) => {
    try {

        const notType = await db.NotificationType.findOne({where: {type: type}});
        return notType.dataValues;

   } catch(err) {
       console.error(err);
       return [];
   }
};

module.exports = {
    getNotificationTypeByType: getNotificationTypeByType
}