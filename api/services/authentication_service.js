"use strict"

const repositories = require("../repositories");
const bcrypt = require("bcrypt");
const config = require("../config/sec.conf");
const od = require("../infrastructure/operation_details");

const login = async (email, password) => {

    let operationDetails = od();

    password = bcrypt.hashSync(password, config.passwordSalt);
    
    let user = await repositories.userRepository.getUserByEmailAndPassword(email, password);
    if(!user) {
        return operationDetails.message = "Email or Password is wrong, check it and try again later";
    }

    if(user.state === "disapprove") {
        let userBlocker = await repositories.userBlockedRepository.getBlockedByUserId(user.id);
        return operationDetails.message = "Your account was bloked. Reason: " + userBlocker.reason;
    }

    if(user.state === "pending") {
        return operationDetails.message = "Your account have pending. Waiting when admin or manager, set access for you.";
    }

    delete user['password'];

    operationDetails.success = true;
    operationDetails.value = user;

    return operationDetails;
};

const logout = async () => {

    // to do

};

module.exports = {
    login: login,
    logout: logout
};
