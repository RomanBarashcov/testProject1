"use strict"

const db = require("../models/index");

const getRoles = async () => {
    try {

        const roles = await db.Role.findAll().map(i => i.dataValues);
        return roles;
        
   } catch(err) {
       console.error(err);
       return [];
   }
};

const getRoleByType = async (type) => {
    try {

        const role = await db.Role.findOne({where: {type: type}});
        return role.dataValues;

    } catch(err) {
       console.error(err);
       return [];
   }
};

module.exports = {
    getRoles: getRoles,
    getRoleByType: getRoleByType
}