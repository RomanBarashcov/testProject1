"use strict"

module.exports = () => {
    
    const db = require("../entities/db");

    const getBlockedByUserId = async (userId) => {

        let userBlocked = await db.UserBlocked.findOne({userId: userId});
        return userBlocked;
    };


    return {
        getBlockedByUserId: getBlockedByUserId
    }
};