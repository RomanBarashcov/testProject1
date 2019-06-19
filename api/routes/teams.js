var express = require('express');
var router = express.Router();
var services = require("../services/index")();

router.get('/', async (req, res, next) => {

   let teams = await services.teamService.getTeams();
   res.json(teams);
   
});

router.get('/:id', async (req, res, next) => {


    let teams = await services.teamService.getTeamById(req.body.id);
    res.json(teams);
    
 });


module.exports = router;
