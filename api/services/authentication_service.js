"use strict"

const userService = require("./user_service");
const userBlockedService  = require("./user_blocked_service");
const bcrypt = require("bcrypt");
const config = require("../config/sec.conf");

const login = async (email, password) => {

    let operationDetails = { success: false, message: "", value: null };

    password = bcrypt.hashSync(password, config.passwordSalt);
    
    let user = await userService.getUserByEmailAndPassword(email, password);
    if(!user.success) {
        return operationDetails.message = "Email or Password is wrong, check it and try again later";
    }

    if(user.state === "disapprove") {
        let userBlocker = await userBlockedService.getBlockedByUserId(user.value.id);
        return operationDetails.message = "Your account was bloked. Reason: " + userBlocker.reason;
    }

    if(user.state === "pending") {
        return operationDetails.message = "Your account have pending. Waiting when admin or manager, set access for you.";
    }

    delete user['password'];

    operationDetails.success = true;
    operationDetails.value = user.value;

    return operationDetails;
};

const logout = async () => {

    // to do

};

module.exports = {
    login: login,
    logout: logout
};
