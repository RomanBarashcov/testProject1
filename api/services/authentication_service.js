"use strict"

const repositories = require("../repositories");
const bcrypt = require("bcrypt");
const config = require("../config/sec.conf");
const operationDetails = require("../infrastructure/operation_details");

const login = async (email, password) => {
    try {

        password = bcrypt.hashSync(password, config.passwordSalt);
        
        let user = await repositories.userRepository.getUserByEmailAndPassword(email, password);
        if(!user) {
            return operationDetails(false, "Email or Password is wrong, check it and try again later");
        }

        if(user["State.type"] === "blocked") {
            return operationDetails(false, "Your account blocked. Reason: " + user.stateReason);
        }

        if(user["State.type"] === "pending") {
            return operationDetails(false, "Your account have pending. Waiting when admin or manager, set access for you.");
        }

        delete user['password'];
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails(false);
    }
};

const logout = async () => {

    // to do

};

module.exports = {
    login: login,
    logout: logout
};
