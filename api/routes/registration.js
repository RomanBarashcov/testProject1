var express = require('express');
var router = express.Router();
var services = require('../services');

router.post('/', async (req, res, next) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPswd =  req.body.confirmPassword;
  const teamId = req.body.teamId;

  if(!name || !email || password || confirmPswd || teamId) {
    res.sendStatus(403).json({ success: false, message: 'Incorrect data' });
  }

  if(password !== confirmPassword) {
      sendStatus(403).json({ success: false, message: "Incorrect confirm password!" });
  }

  let registrateInfo = services.registrationService.registrate(name, email, password, teamId);
  if(!registrateInfo.success) {
    sendStatus(403).json({ success: false, message: registrateInfo.message });
  }
  

  res.json({
    success: true,
    currentUser: user,
    token: token 
  });

});

module.exports = router;
