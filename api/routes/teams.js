var express = require('express');
var router = express.Router();
var services = require("../services/index")();
var corsOptions = require("../const/cors_options").corsOptions;
var cors = require('cors');

router.get('/', cors(corsOptions), async (req, res, next) => {

   let teams = await services.teamService.getTeams();
   res.status(200).json(teams);
   
});

router.get('/:id', async (req, res, next) => {

   let id = parseInt(req.params["id"], 10);

   let teams = await services.teamService.getTeamById(id);
   res.status(200).json(teams);
    
 });


module.exports = router;
