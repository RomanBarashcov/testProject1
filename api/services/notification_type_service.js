"use strict"

const repository = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");

const getStates = async () => {
    try {

        const states = await repository.stateRepository.getStates();
        return operationDetails(true, "", states);

   } catch(err) {
       console.error(err);
       return operationDetails(false);
   }
};

module.exports = {
    getStates: getStates,
}