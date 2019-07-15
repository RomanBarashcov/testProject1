"use strict"

const db = require("../models/index");
const Op = db.Sequelize.Op;

const getUsers = async () => {
    try {

        let users = await db.User.findAll({raw:true,
            attributes: ["id", "name", "email"],
            where: {
                roleId:{
                    [Op.ne]: 1
                }
            },
            include: [{
                model: db.State,
                required: false
            }, { 
                model: db.Role,
                required: false
            }, 
            {
                model: db.Team, 
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
            attributes: ["id", "name", "email", "password"],
            include: [{
                model: db.State,
                required: false
            }, { 
                model: db.Role,
                required: false
            }, 
            {
                model: db.Team, 
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

        const user = await db.User.findOne({raw:true, 
            where: {email: email},
            attributes: ["id", "name", "email", "password"],
            include: [{
                model: db.State,
                required: false
            }, { 
                model: db.Role,
                required: false
            }, 
            {
                model: db.Team, 
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

const updateUserTeam = async (fromUserId, playerId, teamId, stateId, isLeftTeam = false, reason = "") => {
    try {
        
        const teamPlayer = await db.TeamPlayers.findOne({raw:true, where: { userId: playerId } });

        const update = await db.TeamPlayers.update({ 
            teamId: teamId, 
            prev_teamId: teamPlayer.teamId, 
            stateId: stateId,
            is_left: isLeftTeam,
            fromUserId: fromUserId,
            reason_left: reason
        }, { 
            where: { userId: playerId } 
        });

        return update;

    } catch(err) {
        console.error(err);
        return false;
    }
};

const updataUser = async (userId, roleId) => {
    try {

        const user = await db.User.update({
            roleId: roleId
        },{ 
            where: { userId: userId } 
        });

        return user.dataValues;

    } catch(err) {
        console.error(err);
        return false;
    }
}

const createUser = async (name, email, password, stateId, roleId) => {
    try {

        const user = await db.User.create({
            name: name, 
            email: email, 
            password: password, 
            StateId: stateId, 
            RoleId: roleId,
            stateReason: ""
        });

        return user.dataValues;

    } catch(err) {
        console.error(err);
        return false;
    }
};

const updateUserState = async (userId, stateId, reason) => {
    try {

        const user = await db.User.update({
            StateId: stateId,
            stateReason: reason
        },{ 
            where: { id: userId } 
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
    createUser: createUser,
    updataUser: updataUser,
    updateUserState: updateUserState
};