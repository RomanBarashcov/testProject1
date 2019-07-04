"use strict"

const db = require("../models/index");
const Op = db.Sequelize.Op;

const getUsers = async () => {
    try {

        const users = await db.User.findAll({raw:true, 
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

   } catch(err) {
       console.error(err);
       return [];
   }
};

const getUserById = async (userId) => {
    try {

        const user = await db.User.findOne({raw:true, 
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

    } catch(err) {
        console.error(err);
        return [];
    }
};

const getUserByState = async (userId, stateId) => {
    try {

        const user = await db.User.findOne({raw:true}, { 
            where: {
                id: userId,
                stateId: stateId
            }
        });

        return user;

    } catch(err) {
        console.error(err);
        return [];
    }
};

const getUserByEmail = async (email) => {
    try {

        const user = await db.User({raw:true, 
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

    } catch(err) {
        console.error(err);
        return [];
    }
};

const getUserByEmailAndPassword = async (email, password) => {
    try {
        
        const user = await db.User.findOne({raw:true,
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

    } catch(err) {
        console.error(err);
        return [];
    }
};

const updateUserTeam = async (userId, teamId, stateId, isLeftTeam = false, reason = "") => {
    try {
        
        const teamPlayer = await db.TeamPlayers.findOne({raw:true, where: { userId: userId } });

        const update = await db.TeamPlayers.update({ 
            teamId: teamId, 
            prev_teamId: teamPlayer.teamId, 
            stateId: stateId,
            is_left: isLeftTeam,
            reason: reason
        }, { 
            where: { userId: userId } 
        });
;
        return update;

    } catch(err) {
        console.error(err);
        return false;
    }
};

const createUser = async (name, email, password, stateId, roleId) => {
    try {

        const user = await db.User.create({
            name: name, 
            email: email, 
            password: password, 
            stateId: stateId, 
            roleId: roleId
        });

        return user;

    } catch(err) {
        console.error(err);
        return false;
    }

};


module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    getUserByState: getUserByState,
    getUserByEmail: getUserByEmail,
    getUserByEmailAndPassword: getUserByEmailAndPassword,
    updateUserTeam: updateUserTeam,
    createUser: createUser
};