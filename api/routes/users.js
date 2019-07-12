var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/',  async (req, res, next) => {

   const users = await services.userService.getUsers();
   if(!users.success) res.status(500).json({success: false, message: users.message});

   res.status(200).json({users: users.value});
   
});

router.get('/current-user',  async (req, res, next) => {

   const userId = req.decoded.userId;
   if(!userId) res.status(500).json({success: false, message: "Payload data is incorrect"});

   let user = await services.userService.getUserById(userId);
   if(!user.success) res.status(500).json({success: false, message: user.message});

   delete user.value['password'];
   res.status(200).json({user: user.value});
   
});

router.get('/:id', async (req, res, next) => {

   const id = parseInt(req.params["id"], 10);
   if(!id) res.status(500).json({success: false, message: "Payload data is incorrect"});

   const user = await services.userService.getUserById(id);
   if(!user.success) res.status(500);

   res.status(200).json({user: user.value});
   
});

router.put("/team-change", async (req, res, next) => {

   const userId = parseInt(req.body.userId, 10);
   const teamId = parseInt(req.body.teamId, 10);
   const authUserId = req.decoded.userId;

   if(!userId || !teamId || !authUserId) res.status(500).json({success: false, message: "Payload data is incorrect"});

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   if(authUser.value["Role.type"] === "player" 
      && authUser.value.id !== userId) res.status(500).json({success: false, message: "You can change only your role"});

   const isUpdate = await services.userService.updatePlayerTeam(authUser.value, userId, teamId);
   if(!isUpdate.success) res.status(500).json({success: false, message: "Data is incorrect"});

   const user = await services.userService.getUserById(userId);
   const notification = await services.notificationService.userChangeTeamNotification(authUser.value, userId);

   if(!user.success && !notification.success) {
      let message = user.message + " " + notification.message;
      res.status(500).json({success: false, message: message});
   }

   if(!user.success || !notification.success) {
      let message = user.success ? user.message : notification.message;
      res.status(500).json({success: false, message: message});
   } 

   res.status(200).json({user: user.value});

});

router.put("/live-team", async (req, res, next) => {

   const playerId = parseInt(req.body.playerId, 10);
   const teamId = parseInt(req.body.teamId, 10);
   const isLive = req.body.isLive;
   const reason = req.body.reason;
   const authUserId = req.decoded.userId;

   if(!playerId || !teamId || !authUserId)  {
      res.status(500).json({ success: false, message: "Payload data is incorrect"});
   }

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   const liveResult = await services.userService.liveTeam(authUser.value, playerId, teamId, isLive, reason);

   if(!liveResult.success) res.status(500);

   res.status(200).json({user: liveResult.value.user});
});

router.put("/block", async (req, res, next) => {

   const userId = parseInt(req.body.userId, 10);
   const isBlock = req.body.isBlock;
   const reason = req.body.reason;
   const authUserId = req.decoded.userId;

   if(!userId || !teamId || !authUserId)  {
      res.status(500).json({ success: false, message: "Payload data is incorrect"});
   }

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   const blockResult = await services.userService.blockUser(authUser.value, userId, isBlock, reason);

   if(!blockResult.success) res.status(500);

   res.status(200).json({user: blockResult.value.user});
});


module.exports = router;
