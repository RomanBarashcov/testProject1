"use strict"

const repositories = require("../repositories");

const BlockUser = async (reason, userId) => {
    await repositories.userBlockedRepository.blockUser(reason, userId);
};



module.exports = {
    BlockUser: BlockUser
}