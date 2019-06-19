var express = require('express');
var router = express.Router();
var services = require("../services/index")();

router.get('/', async (req, res, next) => {

   let notifications = await services.notificationService.getUsers();
   res.json(notifications);
   
});

module.exports = router;
