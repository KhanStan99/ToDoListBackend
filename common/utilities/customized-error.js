"use strict";

var finalCallback = require("../utilities/utility.js").finalCallBack;

function customizedError(errorCode, errorMessage, cb) {
  var error = new Error();
  error.statusCode = errorCode;
  error.message = errorMessage;

  console.log(
    "\n                                    \n " +
      "*******CUSTOMIZE ERROR CLASS*********" +
      "\n                                     " +
      "\n                                     " +
      "\nError Code: " +
      errorCode +
      "\nError Message: " +
      errorMessage +
      "\n                                     " +
      "\n                                     " +
      "\n                                     " +
      "\n*******CUSTOMIZE ERROR CLASS*********" +
      "\n                                     "
  );

  finalCallback(cb, error, null);
}

exports.customizedError = customizedError;
