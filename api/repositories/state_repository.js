"use strict"

const db = require("../models/index");

const getStateById = async (stateId) => {
    try {

        return await db.State.findOne({raw:true}, {where: {id: stateId}});

   } catch(err) {
       console.error(err);
       return [];
   }
};

const getStateByType = async (type) => {
    try {

        return await db.State.findOne({raw:true}, {where: {type: type}});

    } catch(err) {
       console.error(err);
       return [];
   }
};

module.exports = {
    getStateById: getStateById,
    getStateByType: getStateByType
}