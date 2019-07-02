var express = require('express');
var router = express.Router();
var services = require("../services/index");

/* GET users listing. */
router.get('/',  async (req, res, next) => {

   let users = await services.userService.getUsers();
   if(!users.success) res.status(500);

   res.status(200).json({users: users.value});
   
});

router.get('/current-user',  async (req, res, next) => {

   let userId = req.decoded.userId;
   if(!userId) res.status(500).json({error: "Payload data is incorrect"});

   let user = await services.userService.getUserById(userId);
   if(!user.success) res.status(500);

   delete user.value['password'];
   res.status(200).json({user: user.value});
   
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
   let authUserId = req.decoded.userId;

   if(!userId || !teamId || !authUserId) res.status(500).json({error: "Payload data is incorrect"});
   let authUser = await services.userService.getUserById(authUserId);
   if(!authUser.value) res.status(404);

   if(authUser.value["Role.Type"] === "player" 
      && authUser.value.id !== userId)  res.status(500).json({error: "You can change only your role" });

   let user = await services.userService.updatePlayerTeam(userId, teamId);
   if(!user.success) res.status(500);

   

   let notificationType = await services.notifcationTypeService.getNotificationTypeByType();
   let notification = await services.notificationService.createNotification(authUser)

   res.status(200).json({user: user.value});
});


module.exports = router;
