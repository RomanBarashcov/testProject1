"use strict"

const repositories = require("../repositories");
const stateTypes = require("../const/state_types");
const bcrypt = require("bcrypt");
const config = require("../config/sec.conf");
const operationDetails = require("../infrastructure/operation_details");

const registrate = async (name, email, password, temaId) => {
    try {

        const user = await repositories.userRepository.getUserByEmail(email);
        if(user) return operationDetails(false, "User with the same email was registered!");

        password = bcrypt.hashSync(password, config.passwordSalt);

        const defaultState = await repositories.stateRepository.getStateByType(stateTypes.pending);
        const newUser = await repositories.userRepository.createUser(name, email, password, defaultState.id, roleId);

        if(temaId > 0) {
            const playerTeam = await repositories.teamRepository.addPlayerToTeam(newUser.id, temaId, defaultState.id);
            if(!playerTeam) return operationDetails(false, "Incorrect registration data!");
        }
        
        return operationDetails(true);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

module.exports = {
    registrate: registrate
}