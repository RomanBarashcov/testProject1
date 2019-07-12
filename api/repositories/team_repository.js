"use strict"

const db = require("../models/index");

const getTeams = async () => {
    try {

        return await db.Team.findAll({raw:true});

   } catch(err) {
       console.error(err);
       return [];
   }
};

const getTeamById = async (teamId) => {
    try {
    
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

        return team;

   } catch(err) {
       console.error(err);
       return [];
   }
};

const addPlayerToTeam = async (playerId, teamId, stateId) => {
    try {

        let teamPlayer = await db.TeamPlayers.create({
            UserId: playerId, 
            TeamId: teamId, 
            fromUserId: playerId,
            prev_teamId: teamId, 
            stateId: stateId
        });

        return teamPlayer;

    } catch(err) {
        console.error(err);
        return [];
    }
 };


module.exports = {
    getTeams: getTeams,
    getTeamById: getTeamById,
    addPlayerToTeam: addPlayerToTeam
}