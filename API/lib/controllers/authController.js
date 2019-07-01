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

var _user = _interopRequireDefault(require("../services/user"));

var _helpers = _interopRequireDefault(require("../utils/helpers"));

var _users = _interopRequireDefault(require("../data/data-structure/users"));

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    (0, _classCallCheck2["default"])(this, Auth);
  }

  (0, _createClass2["default"])(Auth, null, [{
    key: "signUp",

    /* eslint camelcase: 0 */
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, first_name, last_name, address, gender, email, password, phoneNumber, id, pass, user, isSaved, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, address = _req$body.address, gender = _req$body.gender, email = _req$body.email, password = _req$body.password, phoneNumber = _req$body.phoneNumber;
                _context.prev = 1;
                _context.next = 4;
                return _helpers["default"].createId(_users["default"]);

              case 4:
                id = _context.sent;
                _context.next = 7;
                return _user["default"].hashPassword(password);

              case 7:
                pass = _context.sent;
                user = new _user["default"](id, first_name, last_name, gender, email, address, pass, phoneNumber);
                isSaved = user.save();

                if (!isSaved) {
                  _context.next = 13;
                  break;
                }

                token = user.generateToken();
                return _context.abrupt("return", res.status(201).json({
                  status: 'Success',
                  data: {
                    token: token,
                    id: id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email
                  }
                }));

              case 13:
                return _context.abrupt("return", res.status(500).json({
                  status: '500 Server Interval Error',
                  error: 'Something went wrong while processing your request, Do try again'
                }));

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", res.status(500).json({
                  status: '500 Server Interval Error',
                  error: 'Something went wrong while processing your request, Do try again'
                }));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 16]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }]);
  return Auth;
}();

var _default = Auth;
exports["default"] = _default;