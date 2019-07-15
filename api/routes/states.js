var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/', async (req, res, next) => {

   let states = await services.stateService.getStates();
   if(!states.success) return res.status(500).json({message: states.message});

   res.status(200).json({states: states.value});
   
});

module.exports = router;
