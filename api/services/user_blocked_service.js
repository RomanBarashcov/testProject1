"use strict"

module.exports = () => {
    
    const db = require("../models/index");

    const getBlockedByUserId = async (userId) => {

        let userBlocked = await db.UserBlocked.findOne({userId: userId});
        return userBlocked;
    };

    const BlockUser = async (reason, userId) => {

        await db.UserBlocked.create({reason: reason, userId: userId});
    };

    return {
        getBlockedByUserId: getBlockedByUserId,
        BlockUser: BlockUser
    }
};