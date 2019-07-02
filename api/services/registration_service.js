"use strict"
const repository = require("../repositories");

const registrate = async (email, password, confirmPassword, temaId, name) => {

    let operationDetails = { success: false, message: "", value: null };

    let user = await repository.userRepository.getUserByEmail(email);
    if(user) {
        return operationDetails.message = "User with the same email was registered!";
    }


    // 1) when all data is correct, give accsess, and make token
    // 2) retrun accsess data to current user, {id: "1", email: "example@mail.com", role: "admin"}
    
    return operationDetails;
};

module.exports = {
    registrate: registrate
}