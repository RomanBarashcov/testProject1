"use strict"

const repositories = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");
const userRoles = require("../const/user_roles");
const stateTypes = require("../const/state_types");

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

const liveTeam = async (fromUser, playerId, teamId, isLeft, reason) => {
    try {
        
        let state = "";

        if(fromUser["Role.type"] !== userRoles.player && isLeft) {
            state = stateTypes.approve;
        } else if(fromUser["Role.type"] !== userRoles.player && !isLeft) {
            state = stateTypes.blocked;
        } else {
            state = stateTypes.pending;
        }

        state = await repositories.stateRepository.getStateByType(state);
        let update = await repositories.userRepository.updateUserTeam(playerId, teamId, state.id, isLeft, reason);
        let user =  await repositories.userRepository.getUserById(playerId);

        return operationDetails(true, "", {user, state});

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