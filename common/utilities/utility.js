"use strict";

var jwt = require("jsonwebtoken");
var config = require("../utilities/config.json");

/* Generate JWT */
function generateJWT(object, callBack) {
  var jwtToken = jwt.sign(object.toJSON(), config.secret, {
    expiresIn: "24h"
  });

  object.uniqueId = jwtToken;
  callBack(null, object);
}

/* Verify JWT*/
function verifyJWT(token, verifyCB) {
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      verifyCB(err, decoded);
    });
  } else {
    verifyCB("Token cannot be empty", null);
  }
}

/* Call Back */
function finalCallBack(callback, error, response) {
  if (error) console.log("Error: " + JSON.stringify(error));
  else console.log("Response: " + JSON.stringify(response));

  callback(error, response);
}

exports.finalCallBack = finalCallBack;
exports.generateJWT = generateJWT;
exports.verifyJWT = verifyJWT;
