"use strict"

const db = require("../models/index");

const getNotificationTypeByType = async (type) => {
    try {

        return await db.Notification.findAll({where: {type: type}}).map(i => i.defaultValues);

   } catch(err) {
       console.error(err);
       return [];
   }
};

module.exports = {
    getNotificationTypeByType: getNotificationTypeByType
}