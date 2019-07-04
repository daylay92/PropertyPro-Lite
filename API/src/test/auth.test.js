import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import {
  validUserData,
  incompleteUserData,
  invalidUserData,
  alreadyExistingUserData,
  validLoginCredentials,
  invalidLoginCredentials,
  incompleteLoginCredentials
} from '../utils/dummy';

const request = supertest(app);

// Unit Test for Authentication Route
describe('Auth Route Endpoints', () => {
  describe('POST api/v1/auth/signup', () => {
    it('should successfully register a user if all required inputs are provided', done => {
      request
        .post('/api/v1/auth/signup')
        .send(validUserData)
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
    it('should not signup a user if any or all of the required fields is/are not provided', done => {
      request
        .post('/api/v1/auth/signup')
        .send(incompleteUserData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Invalid Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it('should not signup a user if any of the input parameters is/are invalid', done => {
      request
        .post('/api/v1/auth/signup')
        .send(invalidUserData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Invalid Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it('should not signup a user if he/she provides an already existing email address', done => {
      request
        .post('/api/v1/auth/signup')
        .send(alreadyExistingUserData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('409 Conflict');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
  });
  //    tests for login
  describe('POST api/v1/auth/signin', () => {
    it('should successfully login a user if user provides valid login credentials', done => {
      request
        .post('/api/v1/auth/signin')
        .send(validLoginCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
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
    it('should prevent user from logging in if any or all of the login credentials is/are not provided', done => {
      request
        .post('/api/v1/auth/signin')
        .send(incompleteLoginCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
    it('should prevent a user from logging in with invalid login credentials', done => {
      request
        .post('/api/v1/auth/signin')
        .send(invalidLoginCredentials)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
  });
});

export default request;
