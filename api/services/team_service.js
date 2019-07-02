"use strict"

const repository = require("../repositories");
var od = require("../infrastructure/operation_details");

const getTeams = async () => {
    try {

        let operationDetails = od();
        const teams = await repository.teamRepository.getTeams();

        operationDetails = od(true, "", teams);
        return operationDetails;

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getTeamById = async (teamId) => {
    try {

        let operationDetails = od();
    
        const team = await repository.teamRepository.getTeamById(teamId);

        operationDetails = od(true, "", team);
        return operationDetails;

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

module.exports = {
    getTeams: getTeams,
    getTeamById: getTeamById
}