var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/', async (req, res, next) => {

   let notificationTypes = await services.notificationTypeService.getTypes();
   if(!states.success) res.status(500).json({message: notificationTypes.message});

   res.status(200).json({notificationTypes: notificationTypes.value});
   
});

module.exports = router;
