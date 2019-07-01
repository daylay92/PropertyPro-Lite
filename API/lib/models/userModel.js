"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var User = function User(id, firstName, lastName, gender, email, address, password, phone) {
  var isAdmin = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  (0, _classCallCheck2["default"])(this, User);
  this.id = id;
  this.first_name = firstName;
  this.last_name = lastName;
  this.gender = gender;
  this.email = email;
  this.address = address;
  this.phoneNumber = phone;
  this.password = password;
  this.is_admin = isAdmin;
};

exports["default"] = User;