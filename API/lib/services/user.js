"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _users = _interopRequireDefault(require("../data/data-structure/users"));

(0, _dotenv.config)();

var User =
/*#__PURE__*/
function (_UserModel) {
  (0, _inherits2["default"])(User, _UserModel);

  function User(id, firstName, lastName, gender, email, address, password, phone) {
    var isAdmin = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    (0, _classCallCheck2["default"])(this, User);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(User).call(this, id, firstName, lastName, gender, email, address, password, phone, isAdmin));
  }

  (0, _createClass2["default"])(User, [{
    key: "save",

    /* eslint camelcase: 0 */
    value: function save() {
      var currentNoOfUsers = _users["default"].length;
      var id = this.id,
          email = this.email,
          first_name = this.first_name,
          last_name = this.last_name,
          password = this.password,
          phoneNumber = this.phoneNumber,
          address = this.address,
          gender = this.gender,
          is_admin = this.is_admin;

      var newNoOfUsers = _users["default"].push({
        id: id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
        is_admin: is_admin
      });

      return newNoOfUsers > currentNoOfUsers;
    }
  }, {
    key: "generateToken",
    value: function generateToken() {
      var id = this.id,
          is_admin = this.is_admin;

      var token = _jsonwebtoken["default"].sign({
        data: {
          id: id,
          is_admin: is_admin
        }
      }, process.env.SIGN_SECRET, {
        expiresIn: '24h'
      });

      return token;
    }
  }], [{
    key: "hashPassword",
    value: function () {
      var _hashPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(password) {
        var pass;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _bcrypt["default"].hash(password, 8);

              case 3:
                pass = _context.sent;
                return _context.abrupt("return", pass);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function hashPassword(_x) {
        return _hashPassword.apply(this, arguments);
      }

      return hashPassword;
    }()
  }, {
    key: "verifyPassword",
    value: function () {
      var _verifyPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(plain, hashed) {
        var isMatch;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _bcrypt["default"].compare(plain, hashed);

              case 3:
                isMatch = _context2.sent;
                return _context2.abrupt("return", isMatch);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function verifyPassword(_x2, _x3) {
        return _verifyPassword.apply(this, arguments);
      }

      return verifyPassword;
    }()
  }]);
  return User;
}(_userModel["default"]);

var _default = User;
exports["default"] = _default;