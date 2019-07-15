"use strict"

const repository = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");

const getRoles = async () => {
    try {

        const roles = await repository.roleRepository.getRoles();
        return operationDetails(true, "", roles);

   } catch(err) {
       console.error(err);
       return operationDetails(false);
   }
};

module.exports = {
    getRoles: getRoles,
}