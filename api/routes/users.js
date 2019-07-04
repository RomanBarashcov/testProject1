var express = require('express');
var router = express.Router();
var services = require("../services/index");

/* GET users listing. */
router.get('/',  async (req, res, next) => {

   const users = await services.userService.getUsers();
   if(!users.success) res.status(500);

   res.status(200).json({users: users.value});
   
});

router.get('/current-user',  async (req, res, next) => {

   const userId = req.decoded.userId;
   if(!userId) res.status(500).json({error: "Payload data is incorrect"});

   let user = await services.userService.getUserById(userId);
   if(!user.success) res.status(500);

   delete user.value['password'];
   res.status(200).json({user: user.value});
   
});

router.get('/:id', async (req, res, next) => {

   const id = parseInt(req.params["id"], 10);
   if(!id) res.status(500).json({error: "Payload data is incorrect"});

   const user = await services.userService.getUserById(id);
   if(!user.success) res.status(500);

   res.status(200).json({user: user.value});
   
});

router.put("/team-change", async (req, res, next) => {

   const userId = parseInt(req.body.userId, 10);
   const teamId = parseInt(req.body.teamId, 10);
   const authUserId = req.decoded.userId;

   if(!userId || !teamId || !authUserId) res.status(500).json({error: "Payload data is incorrect"});

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   if(authUser.value["Role.Type"] === "player" 
      && authUser.value.id !== userId) res.status(500).json({error: "You can change only your role" });

   const user = await services.userService.updatePlayerTeam(userId, teamId);
   const notification = await services.notificationService.userChangeTeamNotification(authUser);

   if(!user.success || !notification.success) res.status(500);

   res.status(200).json({user: user.value});

});

router.put("/live-team", async (req, res, next) => {

   const userId = parseInt(req.body.userId, 10);
   const teamId = parseInt(req.body.teamId, 10);
   const stateId = parseInt(req.body.stateId, 10);
   const isLeft = req.body.isLeft;
   const reason = req.body.reason;
   const authUserId = req.decoded.userId;

   if(!userId || !teamId || !authUserId || !stateId)  {
      res.status(500).json({ success: false, message: "Payload data is incorrect"});
   }

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   const user = await services.userService.liveTeam(userId, teamId, stateId, isLeft, reason);
   const notification = await services.notificationService.userLiveTeamNotification(authUser, stateId, isLeft);

   if(!user.success || !notification.success) res.status(500);

   res.status(200).json({user: user.value});
});


module.exports = router;
