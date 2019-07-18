import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

const request = supertest(app);
describe('Base Route Endpoints', () => {
  describe('GET api/v1/', () => {
    it('should return a response that informs a user he/she has just hit the base URL', done => {
      request
        .get('/api/v1')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, message } = res.body;
          expect(status).to.equal('success');
          expect(message).to.equal('Welcome to the PropertyPro-Lite API');
        })
        .end(done);
    });
  });
  describe('ALL api/v1/*', () => {
    it("should return a resource not found error response whenever a user hits an endpoint that doesn't on the server", done => {
      request
        .post('/api/v1/yfuy')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(res => {
          const { status, message } = res.body;
          expect(status).to.equal('404 Not Found');
          expect(message).to.equal("This route doesn't exist");
        })
        .end(done);
    });
  });
});
