"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");


const getUsers = async () => {
    try {

        let operationDetails = od();
        const users = await repositories.userRepository.getUsers();

        return operationDetails(true, "", users);

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getUserById = async (userId) => {
    try {

        let operationDetails = od();
        const user = await repositories.userRepository.getUserById(userId);

        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const updatePlayerTeam = async (userId, teamId) => {
    try {

        let operationDetails = od();

        const user = await repositories.userRepository.updateUserTeam(userId, teamId);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const liveTeam = async (userId, teamId, stateId, isLeft, reason) => {
    try {

        let operationDetails = od();
        
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