var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/', async (req, res, next) => {

   let notifications = await services.notificationService.getNotifications();
   if(!notifications.success) res.status(500);

   res.status(200).json({notifications:notifications.value});
   
});

module.exports = router;
