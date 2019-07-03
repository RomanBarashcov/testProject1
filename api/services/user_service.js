"use strict"

const repositories = require("../repositories");
const od = require("../infrastructure/operation_details");


const getUsers = async () => {
    try {

        let operationDetails = od();
        const users = await repositories.userRepository.getUsers();

        operationDetails = od(true, "", users);
        return operationDetails;

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getUserById = async (userId) => {
    try {

        let operationDetails = od();
        const user = await repositories.userRepository.getUserById(userId);

        operationDetails = od(true, "", user);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const updateUserTeam = async (fromUser, userId, teamId) => {
    try {

        let operationDetails = od();

        await repositories.userRepository.updateUserTeam(userId, teamId);
        return operationDetails(true);;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const liveTeam = async (fromUser, userId, teamId, isLeft, reason) => {
    try {

        let operationDetails = od();
        await repositories.userRepository.updateUserTeam(userId, teamId, isLeft, reason);
       
        operationDetails = od(true);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};


module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updateUserTeam: updateUserTeam,
    liveTeam: liveTeam
};