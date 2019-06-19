"use strict"

module.exports = () => {
    
    const db = require("../entities/db");

    const getTeams = async () => {

        let res = await db.Team.findAll({raw:true});
        return res;
    };

    const getTeamById = async (teamId) => {

        let res = await db.Team.findByPk(teamId);
        return res;
    };

    return {
        getTeams: getTeams,
        getTeamById: getTeamById
    }
};