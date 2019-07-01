import request from 'supertest';
import { expect } from 'chai';
import app from '../app';
import user from '../utils/dummy';

// Unit Test for Authentication Route
describe('Auth Route Endpoints', () => {
  describe('POST api/v1/auth/signup', () => {
    it('should successfully register a user if all required inputs are provided', done => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('Success');
          expect(data).to.have.all.keys(
            'token',
            'id',
            'first_name',
            'last_name',
            'email'
          );
        })
        .end(done);
    });
  });
});
