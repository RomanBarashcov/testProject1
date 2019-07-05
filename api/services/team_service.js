"use strict"

const repository = require("../repositories");
const operationDetails = require("../infrastructure/operation_details");

const getTeams = async () => {
    try {

        const teams = await repository.teamRepository.getTeams();
        return operationDetails(true, "", teams);

   } catch(err) {
       console.error(err);
       return operationDetails(false);
   }
};

const getTeamById = async (teamId) => {
    try {
    
        const team = await repository.teamRepository.getTeamById(teamId);
        return operationDetails(true, "", team);

   } catch(err) {
       console.error(err);
       return operationDetails(false);
   }
};

module.exports = {
    getTeams: getTeams,
    getTeamById: getTeamById
}