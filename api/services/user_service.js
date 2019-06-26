"use strict"

const db = require("../models/index");
const Op = db.Sequelize.Op;

const getUsers = async () => {

    let users = await db.User.findAll({raw:true, 
        attributes: ["id", "name", "email", "roleId", "stateId"],
        where: {
            roleId:{
                [Op.ne]: 1
            }
        },
        include: [{
            model: db.State,
            attributes: ["type"],
            required: false
        }, { 
            model: db.Role,
            attributes: ["type"],
            required: false
        }, 
        {
            model: db.Team,
            attributes: ["id", "name", "description", "total_score"],
            require: false
        }
    ]});

    return users;
};

const getUserById = async (userId) => {

    let user = await db.User.findOne({raw:true, 
        where: {id: userId},
        attributes: ["id", "name", "email", "password", "roleId", "stateId"],
        include: [{
            model: db.State,
            attributes: ["type"],
            required: false
        }, { 
            model: db.Role,
            attributes: ["type"],
            required: false
        }, 
        {
            model: db.Team,
            attributes: ["id", "name", "description", "total_score"],
            require: false
        }
    ]});

    return user;
};

const getUserByEmail = async (email) => {

    let user = await db.User({raw:true, 
        where: {email: email},
        attributes: ["id", "name", "email", "password", "roleId", "stateId"],
        include: [{
            model: db.State,
            attributes: ["type"],
            required: false
        }, { 
            model: db.Role,
            attributes: ["type"],
            required: false
        }, 
        {
            model: db.Team,
            attributes: ["id", "description", "total_score"],
            require: false
        }
    ]});

    return user;
};

const getUserByEmailAndPassword = async (email, password) => {

    let user = await db.User.findOne({raw:true,
        attributes: ["id", "name", "email", "roleId", "stateId"],
        where: { email: email, password: password },
        include: [{
            model: db.State,
            attributes: ["type"],
            required: false
        }, { 
            model: db.Role,
            attributes: ["type"],
            required: false
        }
    ]});

    return user;
};

const userTeamChange = async (userId, teamId) => {

    let teamPlayer = await db.TeamPlayer.findOne({where:{userId: userId}});
    await db.teamPlayer.update({userId: userId, teamId: teamId}, {where: {id: teamPlayer.id}});
    

};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    getUserByEmailAndPassword: getUserByEmailAndPassword,
    userTeamChange: userTeamChange
};