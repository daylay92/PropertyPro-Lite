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

var Helpers =
/*#__PURE__*/
function () {
  function Helpers() {
    (0, _classCallCheck2["default"])(this, Helpers);
  }

  (0, _createClass2["default"])(Helpers, null, [{
    key: "createId",
    value: function () {
      var _createId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(arr) {
        var length, id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                length = arr.length;

                if (!(length === 0)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", 1);

              case 3:
                id = arr[length - 1].id - 1;
                return _context.abrupt("return", id);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createId(_x) {
        return _createId.apply(this, arguments);
      }

      return createId;
    }()
  }]);
  return Helpers;
}();

var _default = Helpers;
exports["default"] = _default;