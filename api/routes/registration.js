var express = require('express');
var router = express.Router();
var services = require('../services');

router.post('/', async (req, res, next) => {
  
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPswd =  req.body.confirmPassword;
    const teamId = parseInt(req.body.teamId, 10);

    if(!name || !email || !password || !confirmPswd || !teamId) {
        res.status(401).json({ success: false, message: 'Incorrect data' });
    }

    if(password !== confirmPswd) {
        res.status(401).json({ success: false, message: "Incorrect confirm password!" });
    }

    const registrateInfo = await services.registrationService.registrate(name, email, password, teamId);
    if(!registrateInfo.success) {
        res.status(401).json({ success: false, message: registrateInfo.message });
    }

    const notification = await services.notificationService.userRegistrationNotification(registrateInfo.value);
    if(!notification.success) {
        res.status(500).json({ success: false, message: notification.message });
    }
    
    res.json({ success: true });

});

module.exports = router;
