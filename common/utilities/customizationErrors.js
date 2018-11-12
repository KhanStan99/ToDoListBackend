"use strict";

var verifyJWT = require("./utility.js").verifyJWT;

module.exports = function(server) {
  var remotes = server.remotes();
  remotes.before("**", function(ctx, next) {
    var url = ctx.req.originalUrl.toString();
    var headers = ctx.req.headers;
    var request = ctx.req.method.toString();

    console.log(
      "\n                                    \n " +
        "*******API STATUS*********" +
        "\n                                     " +
        "\n                                     " +
        "\nURL: " +
        url +
        "\nRequest: " +
        request +
        "\nBody: " +
        ctx.req.body +
        "\n                                     " +
        "\n                                     " +
        "\n                                     " +
        "\n*******API STATUS*********" +
        "\n                                     "
    );

    if (url === "/api/MyUsers/signup" || url === "/api/MyUsers/login") {
      next();
    } else {
      if (headers.auth) {
        console.log("AUTH: " + headers.auth);

        verifyJWT(headers.auth, function(err, response) {
          if (err) {
            var error = new Error();
            error.statusCode = 401;
            error.message = "Cannot Authenticate User";
            next(error, null);
          } else {
            var id;
            if (request === "GET") {
              var serviceName = url.split("=");
              id = serviceName[1];
            } else {
              id = ctx.req.body.id;
            }
            if (response.id == id) {
              next();
            } else {
              var error = new Error();
              error.statusCode = 401;
              error.message = "You are not authorize to access this data";
              next(error, null);
            }
          }
        });
      } else {
        var error = new Error();
        error.statusCode = 401;
        error.message = "No Unique Identifier Found";
        next(error, null);
      }
    }
  });
};
