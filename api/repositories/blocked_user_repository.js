"use strict"

const db = require("../models/index");

const getBlockedByUserId = async (userId) => {

    let userBlocked = await db.UserBlocked.findOne({userId: userId});
    return userBlocked;
};

const blockUser = async (reason, userId) => {

    await db.UserBlocked.create({reason: reason, userId: userId});
};

module.exports = {
    getBlockedByUserId: getBlockedByUserId,
    blockUser: blockUser
}