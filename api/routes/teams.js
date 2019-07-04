var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/', async (req, res, next) => {

   let teams = await services.teamService.getTeams();
   if(!teams.success) res.status(500).json({success: false, message: teams.message});

   res.status(200).json({teams: teams.value});
   
});

router.get('/:id', async (req, res, next) => {

   let id = parseInt(req.params["id"], 10);
   if(!id) res.status(500).json({success: false, message: "Payload data is incorrect"});

   let team = await services.teamService.getTeamById(id);
   if(!team.success) res.status(500).json({success: false, message: team.message});

   res.status(200).json({team: team.value});
    
 });


module.exports = router;
