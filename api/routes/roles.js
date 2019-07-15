var express = require('express');
var router = express.Router();
var services = require("../services/index");

router.get('/', async (req, res, next) => {

   let roles = await services.roleService.getRoles();
   if(!roles.success) res.status(500).json({message: roles.message});

   res.status(200).json({roles: roles.value});
   
});

module.exports = router;
