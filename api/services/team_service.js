"use strict"

module.exports = () => {
    
    const db = require("../models/index");

    const getTeams = async () => {

        let teams = await db.Team.findAll({raw:true});

        return teams;
    };

    const getTeamById = async (teamId) => {

        
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
    };

    return {
        getTeams: getTeams,
        getTeamById: getTeamById
    }
};