var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/',  async (req, res, next) => {

   const users = await services.userService.getUsers();
   if(!users.success) return res.status(500).json({success: false, message: users.message});

   res.status(200).json({users: users.value});
   
});

router.get('/current-user',  async (req, res, next) => {

   const userId = req.decoded.userId;
   if(!userId) return res.status(500).json({success: false, message: "Payload data is incorrect"});

   let user = await services.userService.getUserById(userId);
   if(!user.success) return res.status(500).json({success: false, message: user.message});

   delete user.value['password'];
   res.status(200).json({user: user.value});
   
});

router.get('/:id', async (req, res, next) => {

   const id = parseInt(req.params["id"], 10);
   if(!id) return res.status(500).json({success: false, message: "Payload data is incorrect"});

   const user = await services.userService.getUserById(id);
   if(!user.success) res.status(500);

   res.status(200).json({user: user.value});
   
});

router.post("/update-user", async (req, res, next) => {

   const userId = parseInt(req.body.userId, 10);
   let teamId = parseInt(req.body.teamId, 10);
   let roleId = parseInt(req.body.roleId, 10);
   const authUserId = req.decoded.userId;

   if(!userId || !teamId || !authUserId) res.json({success: false, message: "Payload data is incorrect"});

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   if(authUser.value["Role.type"] === "player" 
      && authUser.value.id !== userId) return res.json({success: false, message: "You can change only your role"});

   const user = await services.userService.getUserById(userId);

   teamId = teamId === 0 ? user.value["Teams.id"] : teamId;
   roleId = roleId === 0 ? user.value["Role.id"] : roleId;

   if(user.value["Teams.id"] !== teamId) {
      const notification = await services.notificationService.userChangeTeamNotification(authUser.value, userId);
      const isUpdate = await services.userService.updatePlayerTeam(authUser.value, userId, teamId);
      if(!notification.success || !isUpdate.success) return res.json({success: false, message: "Data is incorrect"});
   }

   if(user.value["Role.id"] !== roleId) {
      const updateRole = await services.userService.updataUserRole(userId, roleId);
      if(!updateRole.success) return res.json({success: false, message: "Data is incorrect"});
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
      return res.status(500).json({ success: false, message: "Payload data is incorrect"});
   }

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) return res.status(404);

   const liveResult = await services.userService.liveTeam(authUser.value, playerId, teamId, isLive, reason);

   if(!liveResult.success) return res.status(500);

   res.status(200).json({user: liveResult.value.user});

});

router.put("/block", async (req, res, next) => {

   const userId = parseInt(req.body.userId, 10);
   const isBlock = req.body.isBlock;
   const reason = req.body.reason;
   const authUserId = req.decoded.userId;

   if(!userId || !authUserId)  {
     return res.status(500).json({ success: false, message: "Payload data is incorrect"});
   }

   const authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) return res.status(404);

   const blockResult = await services.userService.blockUser(authUser.value, userId, isBlock, reason);

   if(!blockResult.success) return res.status(500);

   res.status(200).json({user: blockResult.value.user});
});


module.exports = router;
