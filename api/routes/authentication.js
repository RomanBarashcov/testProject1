var express = require('express');
var jwt = require("jsonwebtoken");
var services = require('../services');
var config = require('../config/sec.conf');

var router = express.Router();

router.post('/', async (req, res, next) => {
  
  let email = req.body.email;
  let password = req.body.password;

  if(!email || !password) {

    res.sendStatus(403).json({
        success: false,
        message: 'Incorrect username or password'
      });

  }

  let creds = await services.authenticationService.login(email, password);
  if(!creds.success) {
    res.sendStatus(403).json({
        success: false,
        message: creds.message
      });
  }

  let user = creds.value;
  let token = jwt.sign({userId: user.id}, config.secret, { expiresIn: '24h' });

  let days = 30;
  let date = new Date().setTime(new Date().getTime()+(days*24*60*60*1000));
  expires = new Date(date);

  let origin = req.get('origin');

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,origin,Origin");

  res.cookie("project-access", token, {
    path: "/",
    expires: expires
  });

  res.json({
    success: true,
    currentUser: user,
    token: token 
  });

});

module.exports = router;
