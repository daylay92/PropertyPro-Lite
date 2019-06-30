"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _chai = require("chai");

var _app = _interopRequireDefault(require("../app"));

var _dummy = _interopRequireDefault(require("./dummy"));

// Unit Test for Authentication Route
describe('Auth Route Endpoints', function () {
  describe('POST api/v1/auth/signup', function () {
    it('should successfully register a user if all required inputs are provided', function (done) {
      (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/signup').send(_dummy["default"]).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).expect(function (res) {
        var _res$body = res.body,
            status = _res$body.status,
            data = _res$body.data;
        (0, _chai.expect)(status).to.equal('Success');
        (0, _chai.expect)(data).to.have.all.keys('token', 'id', 'first_name', 'last_name', 'email');
      }).end(done);
    });
  });
});