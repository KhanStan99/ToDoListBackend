"use strict";

function customizedError(errorCode, errorMessage, cb) {
  var error = new Error();
  error.statusCode = errorCode;
  error.message = errorMessage;

  console.log("*******CUSTOMIZE ERROR CLASS********* " +
    "\nError Code: " + errorCode +
    "\nError Message: " + errorMessage +
    "\n*******CUSTOMIZE ERROR CLASS*********");

  cb(error, null);
}

exports.customizedError = customizedError;
