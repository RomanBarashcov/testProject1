"use strict"

const db = require("../models/index");

const getStates = async () => {
    try {

        const state = await db.State.findAll();
        return state.dataValues;
        
   } catch(err) {
       console.error(err);
       return [];
   }
};

const getStateById = async (stateId) => {
    try {

        const state = await db.State.findByPk(stateId);
        return state.dataValues;
        
   } catch(err) {
       console.error(err);
       return [];
   }
};

const getStateByType = async (type) => {
    try {

        const state = await db.State.findOne({where: {type: type}});
        return state.dataValues;

    } catch(err) {
       console.error(err);
       return [];
   }
};

module.exports = {
    getStates: getStates,
    getStateById: getStateById,
    getStateByType: getStateByType
}