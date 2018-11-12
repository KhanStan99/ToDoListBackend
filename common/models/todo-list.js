"use strict";

var customError = require("../utilities/customized-error.js").customizedError;
var finalCallBack = require("../utilities/utility.js").finalCallBack;

module.exports = function(TodoList) {
  //region: POST TODO List

  TodoList.remoteMethod("postTask", {
    description: "To post todo task",
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
      path: "/postTask",
      verb: "post"
    }
  });

  TodoList.postTask = function(input, callback) {
    if (input.id && input.title) {
      input.finishedInd = "N";
      // console.log(in);
      TodoList.create(input, function(err, res) {
        if (err) finalCallBack(callback, err, null);
        else finalCallBack(callback, null, res);
      });
    } else {
      customError(400, "UserId and Title are mandatory", callback);
    }
  };

  //endregion: POST TODO List

  //region: Get TODO Tasks

  TodoList.remoteMethod("getTask", {
    description: "To post todo task",
    returns: {
      type: "object",
      root: true
    },
    accepts: [
      {
        arg: "id",
        type: "number",
        http: {
          source: "query"
        }
      }
    ],
    http: {
      path: "/getTask",
      verb: "GET"
    }
  });

  TodoList.getTask = function(id, callback) {
    if (id) {
      TodoList.find(
        {
          where: {
            id: id
          }
          // order: 'videoorderby ASC'
        },
        function(error, response) {
          if (error) {
            finalCallBack(callback, error, null);
          } else {
            finalCallBack(callback, null, response);
          }
        }
      );
    }
  };

  //endregion: Get TODO Tasks
};
