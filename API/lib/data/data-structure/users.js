"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var users = [{
  id: 1,
  email: 'zaylay92@yahoo.com',
  first_name: 'Ayo',
  last_name: 'Dele',
  password: _bcrypt["default"].hashSync('ayo1234', 8),
  phoneNumber: '08062490454',
  address: '23, Andy Street, Ketu',
  gender: 'Male',
  is_admin: false
}, {
  id: 2,
  email: 'yaylay92@yahoo.com',
  first_name: 'Ayo',
  last_name: 'Tomi',
  password: _bcrypt["default"].hashSync('tomi1234', 8),
  phoneNumber: '08062490454',
  address: '22, Andy Street, Ketu',
  gender: 'Female',
  is_admin: false
}];
var _default = users;
exports["default"] = _default;