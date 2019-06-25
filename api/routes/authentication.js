var express = require('express');
var Cookie = require("cookie");
var jwt = require("jsonwebtoken");
var services = require('../services');
var baseHeader = require('../const/base_header');
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

  let token = jwt.sign({username: creds.value.user}, config.secret, { expiresIn: '24h' });

  let setCookie = Cookie.serialize("project-access", token, {
    path: "/"
  });

  let header = baseHeader(req.get('origin'))["set-cookie"] = setCookie;

  res.header(header)
  res.status(200).json({
    currentUser: creds.value.user
  });

});

module.exports = router;
