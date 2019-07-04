"use strict"

const repositories = require("../repositories");
const bcrypt = require("bcrypt");
const config = require("../config/sec.conf");
const od = require("../infrastructure/operation_details");

const login = async (email, password) => {
    try {
        
        let operationDetails = od();

        password = bcrypt.hashSync(password, config.passwordSalt);
        
        let user = await repositories.userRepository.getUserByEmailAndPassword(email, password);
        if(!user) {
            return operationDetails(false, "Email or Password is wrong, check it and try again later");
        }

        if(user.state === "blocked") {
            return operationDetails(false, "Your account was bloked. Reason: " + user.reason);
        }

        if(user.state === "pending") {
            return operationDetails(false, "Your account have pending. Waiting when admin or manager, set access for you.");
        }

        delete user['password'];
        return operationDetails(true, "", user);

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const logout = async () => {

    // to do

};

module.exports = {
    login: login,
    logout: logout
};
