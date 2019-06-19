"use strict"

module.exports = () => {
    
    const db = require("../entities/db");
    const services = require("./index")();

    const registrate = async (email, password, name, roleId) => {
        let operationDetails = {success: false, message: "", value: null};

        // impotant email must be uniq
        let res = await services.userService.getUserByEmail(email);
        if(res) {
            operationDetails.message = "Email is duplicate, try to set another email address";
        }

        // 1) when all data is correct, give accsess, and make token
        // 2) retrun accsess data to current user, {id: "1", email: "example@mail.com", role: "admin"}
        
        return operationDetails;
    };

    return {
        registrate: registrate
    }
};