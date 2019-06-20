"use strict"

module.exports = () => {
    
    const services = require("./index")();
    const bcrypt = require("bcrypt");
    const config = require("../config");

    const login = async (email, password) => {

        let operationDetails = { success: false, message: "", value: null };

        password = bcrypt.hashSync(password, config.passwordSalt);

        let user = await services.userService.getUserByEmailAndPassword(email, password);
        if(!user) {
            return operationDetails.message = "Email or Password is wrong, check it and try again later";
        }

        if(user.state === "disapprove") {
            let userBlocker = await services.userBlockedService.getBlockedByUserId(user.id);
            return operationDetails.message = "Your account was bloked. Reason: " + userBlocker.reason;
        }

        if(user.state === "pending") {
            return operationDetails.message = "Your account have pending. Waiting when admin or manager, set access for you.";
        }

        delete user['password'];

        operationDetails.success = true;
        return operationDetails.value = user;
    };

    const logout = async () => {

       // to do

    };

    return {
        login: login,
        logout: logout
    }
};