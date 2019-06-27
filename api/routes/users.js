var express = require('express');
var router = express.Router();
var services = require("../services/index");

/* GET users listing. */
router.get('/',  async (req, res, next) => {

   let users = await services.userService.getUsers();
   if(!users.success) res.status(500);

   res.status(200).json({users: users.value});
   
});

router.get('/:id', async (req, res, next) => {

   let id = parseInt(req.params["id"], 10);
   if(!id) res.status(500).json({error: "Payload data is incorrect"});

   let user = await services.userService.getUserById(id);
   if(!user.success) res.status(500);

   res.status(200).json({user: user.value});
   
});

router.put("/team-change", async (req, res, next) => {

   let userId = parseInt(req.body.userId, 10);
   let teamId = parseInt(req.body.teamId, 10);

   if(!userId || !teamId) res.status(500).json({error: "Payload data is incorrect"});
   
   let user = await services.userService.updatePlayerTeam(userId, teamId);
   if(!user.success) res.status(500);

   res.status(200).json({user: user.value});
});


module.exports = router;
