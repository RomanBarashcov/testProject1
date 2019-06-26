var express = require('express');
var router = express.Router();
var services = require("../services/index");

/* GET users listing. */
router.get('/', async (req, res, next) => {

   let users = await services.userService.getUsers();

    res.status(200).json(users);
   
});

router.get('/:id', async (req, res, next) => {

   let id = parseInt(req.params["id"], 10);

   let user = await services.userService.getUserById(id);
   res.status(200).json(user);
   
});

router.put("/team-change", async (req, res, next) => {
   let userId = parseInt(req.params["userId"], 10);
   let teamId = parseInt(req.params["teamId"], 10);

   let user = await services.userService.userTeamChange(userId, teamId);
   res.status(200).json(user);
});

router.get('/:role', async (req, res, next) => {

   //let role = req.params["role"];

   //let users = await services.userService.getUsersByRole(role);
  // res.status(200).json(users);
   
});

module.exports = router;
