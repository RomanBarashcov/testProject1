"use strict"

module.exports = () => {

    const db = require("../entities/db");

    const getUsers = async () => {

        let res = await db.User.findAll({raw:true});
        return res;
    };
    
    const getUserById = async (userId) => {

        let res = await db.User.findByPk(userId);
        return res;
    };

    const getUserByEmail = async (email) => {

        let res = await db.User.findOne({
            where: {email: email}
        });

        return res;

    };

    return {
        getUsers: getUsers,
        getUserById: getUserById,
        getUserByEmail: getUserByEmail
    }
};