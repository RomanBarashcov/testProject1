"use strict"

module.exports = () => {

    const db = require("../models/index");

    const getUsers = async () => {

        let users = await db.User.findAll({raw:true, 
            include: [{
                model: db.State,
                required: false
            }, { 
                model: db.Role,
                required: false
            }
        ]});

        return users;
    };
    
    const getUserById = async (userId) => {

        let user = await db.User.findByPk(userId);
        return user;
    };

    const getUserByEmail = async (email) => {

        let user = await db.User.findOne({
            where: { email: email },
            include: [{ 
                model: await db.Role, as: "role",
                required: false
            },{
                model: await db.State, as: "state",
                required: false
            }
        ]});

        return user;

    };

    const getUserByEmailAndPasswor = async (email, password) => {

        let user = await db.User.findOne({
            where: { email: email, password: password },
            include: [{ 
                model: await db.Role, as: "role" , 
                required: false
            },{
                model: await db.State, as: "state", 
                required: false
            }
        ]});

        return user;

    };

    return {
        getUsers: getUsers,
        getUserById: getUserById,
        getUserByEmail: getUserByEmail,
        getUserByEmailAndPasswor: getUserByEmailAndPasswor
    }
};