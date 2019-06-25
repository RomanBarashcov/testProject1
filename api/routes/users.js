var express = require('express');
var router = express.Router();
var services = require("../services/index");
var corsOptions = require("../const/cors_options").corsOptions;
var cors = require('cors');
var baseHeader = require('../const/base_header');

/* GET users listing. */
router.get('/', async (req, res, next) => {

   let users = await services.userService.getUsers();
   
    let header = baseHeader(req.get('origin'));
    res.header(header)
    res.status(200).json({
      users: users
    });
   
});

router.get('/:id', cors(corsOptions), async (req, res, next) => {

   let id = parseInt(req.params["id"], 10);

   let user = await services.userService.getUserById(id);
   res.status(200).json(user);
   
});

router.get('/:role', async (req, res, next) => {

   //let role = req.params["role"];

   //let users = await services.userService.getUsersByRole(role);
  // res.status(200).json(users);
   
});

module.exports = router;
