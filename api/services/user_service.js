"use strict"

const repositories = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");


const getUsers = async () => {
    try {

        const users = await repositories.userRepository.getUsers();
        return operationDetails(true, "", users);

   } catch(err) {
       console.error(err);
       return operationDetails(false);
   }
};

const getUserById = async (userId) => {
    try {

        const user = await repositories.userRepository.getUserById(userId);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const updatePlayerTeam = async (userId, teamId) => {
    try {

        const user = await repositories.userRepository.updateUserTeam(userId, teamId);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const liveTeam = async (userId, teamId, stateId, isLeft, reason) => {
    try {
        
        const user = await repositories.userRepository.updateUserTeam(userId, teamId, stateId, isLeft, reason);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};


module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updatePlayerTeam: updatePlayerTeam,
    liveTeam: liveTeam
};