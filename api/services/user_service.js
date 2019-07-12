"use strict"

const repositories = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");
const userRoles = require("../const/user_roles");
const stateTypes = require("../const/state_types");
const notificationServoce = require("../services/notification_service");

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

const updatePlayerTeam = async (fromUser, playerId, teamId) => {
    try {

        let state = "";

        if(fromUser["Role.type"] !== userRoles.player) {
            state = stateTypes.approve;
        } else {
            state = stateTypes.pending;
        }

        state = await repositories.stateRepository.getStateByType(state);
        const user = await repositories.userRepository.updateUserTeam(fromUser.id, playerId, teamId, state.id);
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const liveTeam = async (fromUser, playerId, teamId, isLeft, reason) => {
    try {
        
        let state = "";

        if(fromUser["Role.type"] !== userRoles.player) {
            state = stateTypes.approve;
        } else {
            state = stateTypes.pending;
        }

        state = await repositories.stateRepository.getStateByType(state);

        const notification = await notificationServoce.userLiveTeamNotification(fromUser, playerId, state.id, isLeft);
        const update = await repositories.userRepository.updateUserTeam(fromUser.id, playerId, teamId, state.id, isLeft, reason);
        const user =  await repositories.userRepository.getUserById(playerId);

        return operationDetails(true, "", {user, notification});

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const blockUser = async (fromUser, userId, isBlock, reason) => {
    try {

        let state = "";
;
        if(isBlock) {
            state = stateTypes.blocked;
        } else {
            state = stateTypes.approve;
        }
  
        state = await repositories.stateRepository.getStateByType(state);
        const notification = await notificationServoce.userProfileNotification(fromUser, userId, isBlock);
        let user = await repositories.userRepository.updateUserState(userId, state.id, reason);
        user =  await repositories.userRepository.getUserById(userId);

        return operationDetails(true, "", {user, notification});

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }

};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    updatePlayerTeam: updatePlayerTeam,
    liveTeam: liveTeam,
    blockUser: blockUser
};