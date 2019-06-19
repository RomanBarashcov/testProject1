"use strict"

module.exports = () => {
    
    const db = require("../entities/db");
    const services = require("./index")();

    const login = async (email, password) => {
        let operationDetails = {success: false, message: "", value: null};

        let res = await services.userService.getUserByEmail(email);
        if(!res) {
            operationDetails.message = "Email or Password is wrong, check it and try again later";
        }

        // 1) check password hash with password from request
        // 2) when password is correct, give accsess, and make new token
        // 3) retrun accsess data to current user, {id: "1", email: "example@mail.com", role: "admin"}
        
        return operationDetails;
    };

    const logout = async (notificationId) => {

       // to do

    };

    return {
        login: login,
        logout: logout
    }
};