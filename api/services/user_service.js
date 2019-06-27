"use strict"

const db = require("../models/index");
const Op = db.Sequelize.Op;
var od = require("../infrastructure/operation_details");

const getUsers = async () => {
    try {

        let operationDetails = od();

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

    operationDetails = od(true, "", users);
    return operationDetails;

   } catch(err) {
       console.error(err);
       return operationDetails;
   }
};

const getUserById = async (userId) => {
    try {

        let operationDetails = od();

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


     operationDetails = od(true, "", user);
     return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const getUserByEmail = async (email) => {
    try {

        let operationDetails = od();

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

        operationDetails = od(true, "", user);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const getUserByEmailAndPassword = async (email, password) => {
    try {

        let operationDetails = od();
        
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

        operationDetails = od(true, "", user);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const getCurrentUser = async () => {
    try {

        let operationDetails = od();
        
        // to do 

        operationDetails = od(true, "", null);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

const updateUserTeam = async (userId, teamId) => {
    try {

        let operationDetails = od();
        
        let teamPlayer = await db.TeamPlayers.findOne({raw:true, where: { userId: userId } });

        let inPending = await db.State.findOne({ raw:true, where: {type: "pending"} });

        await db.TeamPlayers.update({ 
            teamId: teamId, 
            prev_teamId: teamPlayer.teamId, 
            stateId: inPending.id 
        }, { 
            where: { userId: userId } 
        });

        operationDetails = od(true);
        return operationDetails;

    } catch(err) {
        console.error(err);
        return operationDetails;
    }
};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    getUserByEmailAndPassword: getUserByEmailAndPassword,
    updateUserTeam: updateUserTeam
};