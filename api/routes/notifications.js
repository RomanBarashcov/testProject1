var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/', async (req, res, next) => {

   let notifications = await services.notificationService.getNotifications();
   if(!notifications.success) return res.status(500).json({message: notifications.message});

   res.status(200).json({notifications: notifications.value});
   
});

module.exports = router;
