var express = require('express');
var router = express.Router();
var services = require("../services/index")();

/* GET users listing. */
router.get('/', async (req, res, next) => {

   let users = await services.userService.getUsers();
   res.json(users);
   
});

module.exports = router;
