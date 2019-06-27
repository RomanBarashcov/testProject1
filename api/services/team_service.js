"use strict"

const db = require("../models/index");
var od = require("../infrastructure/operation_details");

const getTeams = async () => {
    try {

        let operationDetails = od();
        let teams = await db.Team.findAll({raw:true});

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
    
        let team = await db.Team.findOne({raw:true, 
            where: {id: teamId}
        });

        let teamPlayers = await db.User.findAll({raw:true,
            attributes:["id", "name", "email"],
            include: [{
                model: db.Team,
                attributes:["id"],
                where: { id: teamId }
            }]
        });

        team.teamPlayers = teamPlayers;

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