"use strict";
var bcrypt = require("bcrypt");
var customError = require("../utilities/customized-error.js")
  .customizedError;
const saltRounds = 10;
var generateJWT = require("../utilities/utility.js").generateJWT;
var finalCallback = require("../utilities/utility.js").finalCallBack;

module.exports = function(MyUsers) {
  //region: Sign Up

  MyUsers.remoteMethod("signup", {
    description: "To login up user",
    returns: {
      type: "object",
      root: true
    },
    accepts: [
      {
        arg: "data",
        type: "object",
        required: true,
        http: {
          source: "body"
        }
      }
    ],
    http: {
      path: "/signup",
      verb: "post"
    }
  });

  MyUsers.signup = function(input, callback) {
    if (input.email && input.firstName && input.lastName && input.password) {
      isEmailExist(input.email, function(err, res) {
        if (err) {
          finalCallback(callback, err, null);
        } else {
          if (res == null) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(input.password, salt, function(err, hash) {
                input.password = hash;
                MyUsers.create(input, function(err, res) {
                  if (err) {
                    finalCallback(callback, err, null);
                  } else {
                    finalCallback(callback, null, res);
                  }
                });
              });
            });
          } else {
            customError(400, "This email already exist", callback);
          }
        }
      });
    } else {
      customError(400, "All fields are mandatory", callback);
    }
  };

  //endregion: Sign Up

  //region: Login

  MyUsers.remoteMethod("login", {
    description: "To sign up user",
    returns: {
      type: "object",
      root: true
    },
    accepts: [
      {
        arg: "data",
        type: "object",
        required: true,
        http: {
          source: "body"
        }
      }
    ],
    http: {
      path: "/login",
      verb: "post"
    }
  });

  MyUsers.login = function(input, callback) {
    if (input.email && input.password) {
      isEmailExist(input.email, function(err, myUsersResponse) {
        if (err) finalCallback(callback, err, null);
        else {
          if (myUsersResponse != null) {
            bcrypt.compare(input.password, myUsersResponse.password, function(
              err,
              res
            ) {
              if (res) {
                generateJWT(myUsersResponse, callback);
              } else {
                customError(400, "Please enter correct password", callback);
              }
            });
          } else {
            customError(400, "Email Not Found", callback);
          }
        }
      });
    } else {
      customError(400, "Email & Password is mandatory", callback);
    }
  };

  //endregion: Login

  function isEmailExist(email, cb) {
    MyUsers.findOne(
      {
        where: {
          email: email
        }
      },
      function(err, res) {
        if (err) cb(err, null);
        else cb(null, res);
      }
    );
  }

};
