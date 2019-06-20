"use strict"

module.exports = () => {
    
    const db = require("../entities/db");
    const services = require("./index")();

    const registrate = async (email, password, name) => {

        let operationDetails = { success: false, message: "", value: null };

        let user = await services.userService.getUserByEmail(email);
        if(user) {
            return operationDetails.message = "User with the same email was registered!";
        }


        // 1) when all data is correct, give accsess, and make token
        // 2) retrun accsess data to current user, {id: "1", email: "example@mail.com", role: "admin"}
        
        return operationDetails;
    };

    return {
        registrate: registrate
    }
};