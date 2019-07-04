"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");


const getUsers = async () => {

    let operationDetails = od();

    try {

        const users = await repositories.userRepository.getUsers();
        return operationDetails(true, "", users);

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getUserById = async (userId) => {

    let operationDetails = od();

    try {

        const user = await repositories.userRepository.getUserById(userId);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const updatePlayerTeam = async (userId, teamId) => {

    let operationDetails = od();

    try {

        const user = await repositories.userRepository.updateUserTeam(userId, teamId);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const liveTeam = async (userId, teamId, stateId, isLeft, reason) => {

    let operationDetails = od();

    try {
        
        const user = await repositories.userRepository.updateUserTeam(userId, teamId, stateId, isLeft, reason);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};


module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updatePlayerTeam: updatePlayerTeam,
    liveTeam: liveTeam
};