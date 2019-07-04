"use strict"

const repository = require("../repositories");
var od = require("../infrastructure/operation_details");

const getTeams = async () => {

    let operationDetails = od();

    try {

        const teams = await repository.teamRepository.getTeams();
        return operationDetails(true, "", teams);

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getTeamById = async (teamId) => {

    let operationDetails = od();

    try {
    
        const team = await repository.teamRepository.getTeamById(teamId);
        return operationDetails(true, "", team);

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

module.exports = {
    getTeams: getTeams,
    getTeamById: getTeamById
}