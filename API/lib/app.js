"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _express = _interopRequireDefault(require("express"));

// Initialize process.env variables for the .env file
(0, _dotenv.config)(); // Create Express app

var app = (0, _express["default"])(); // Set server port

var port = process.env.PORT || 3000;
app.set('port', port); // Default Route

app.get('/api/v1', function (req, res) {
  return res.status(200).json({
    status: 'Success',
    message: 'Welcome to the PropertyPro-Lite API'
  });
}); // Respond to Non-existent Route

app.all('*', function (req, res) {
  return res.status(404).json({
    status: '404 Not Found',
    message: "This route doesn't exist"
  });
}); // Listen for Requests to Server

app.listen(port, function () {
  return console.log("Amazing stuff is happening on port: ".concat(app.get('port')));
}); // Export app for use in test modules

var _default = app;
exports["default"] = _default;