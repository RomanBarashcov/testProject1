let jwt = require('jsonwebtoken');
const config = require('../config/sec.conf');
var Cookie = require("cookie");

let checkToken = (req, res, next) => {
  
  let token = req.headers && req.headers.cookie;

  if(!token) {

    return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });

  } else if(token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      var cookie = req.headers.cookie;
      var parsedCookie = Cookie.parse(cookie);

      jwt.verify(parsedCookie["project-access"], config.secret, (err, decoded) => {

        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });

    } catch(err) {
      console.log(err);
    }
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}