import { expect } from 'chai';
import path from 'path';
import request from './auth.test';
import { validToken, inValidToken } from '../utils/dummy';

let testPropertyId = null;

describe('Property Route Endpoints', () => {
  describe('POST api/v1/property', () => {
    it('should allow an authenticated user(Agent) to successfully post a property advert if he/she provides all the required data', done => {
      request
        .post('/api/v1/property')
        .field('status', 'Available')
        .field('price', 800000)
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '30, Caleb Road')
        .field('type', 'Mini Flat')
        .field('purpose', 'For Rent')
        .attach(
          'image',
          path.resolve(__dirname, '../../../UI/assets/images/1.jpg')
        )
        .set('x-access-token', validToken)
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(res => {
          const { status, data } = res.body;
          testPropertyId = data.id;
          expect(status).to.equal('Success');
          expect(data).to.have.all.keys(
            'id',
            'status',
            'type',
            'state',
            'city',
            'address',
            'price',
            'created_on',
            'image_url',
            'purpose',
            'imageName',
            'otherType'
          );
        })
        .end(done);
    });
    it('should prevent an unathenticated user from posting a property advert', done => {
      request
        .post('/api/v1/property')
        .field('status', 'Available')
        .field('price', 80000.0)
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .attach(
          'image',
          path.resolve(__dirname, '../../../UI/assets/images/1.jpg')
        )
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Required');
        })
        .end(done);
    });
    it('should prevent a user with an Invalid token from posting a property advert', done => {
      request
        .post('/api/v1/property')
        .field('status', 'Available')
        .field('price', 80000.0)
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .attach(
          'image',
          path.resolve(__dirname, '../../../UI/assets/images/1.jpg')
        )
        .set('Connection', 'keep-alive')
        .set('x-access-token', inValidToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Invalid');
        })
        .end(done);
    });
    it('should prevent a user from posting a property advert if he/she provides invalid input parameters', done => {
      request
        .post('/api/v1/property')
        .field('status', 'Available')
        .field('price', 'rhjfioo')
        .field('state', 'Lagos')
        .field('city', 12344)
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .attach(
          'image',
          path.resolve(__dirname, '../../../UI/assets/images/1.jpg')
        )
        .set('Connection', 'keep-alive')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it('should prevent a user from posting an advert if any/all the required input parameters is/are not provided or is/are provided as empty fields', done => {
      request
        .post('/api/v1/property')
        .field('status', 'Available')
        .field('price', '')
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .attach(
          'image',
          path.resolve(__dirname, '../../../UI/assets/images/1.jpg')
        )
        .set('Connection', 'keep-alive')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
  });
  // get property
  describe('GET api/v1/property', () => {
    it('should return all property adverts at once or in chunks', done => {
      request
        .get(`/api/v1/property`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          expect(status).to.equal('Success');
          expect(data).to.be.an('array');
          expect(data[0]).to.have.all.keys(
            'id',
            'status',
            'type',
            'state',
            'city',
            'address',
            'price',
            'created_on',
            'image_url',
            'ownerEmail',
            'ownerPhoneNumber',
            'purpose',
            'otherType'
          );
        })
        .end(done);
    });
  });
  // get properties by type
  describe('GET api/v1/property?type=propertyType', () => {
    it('should return all property adverts whose type is of Mini Flat', done => {
      request
        .get(`/api/v1/property?type=Mini Flat`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          const { type } = data[0];
          expect(type).to.equal('Mini Flat');
          expect(status).to.equal('Success');
          expect(data).to.be.an('array');
          expect(data[0]).to.have.all.keys(
            'id',
            'status',
            'type',
            'state',
            'city',
            'address',
            'price',
            'created_on',
            'image_url',
            'ownerEmail',
            'ownerPhoneNumber',
            'purpose',
            'otherType'
          );
        })
        .end(done);
    });
    it('should return all property adverts whose type is of 2 Bedroom', done => {
      request
        .get(`/api/v1/property?type=2 Bedroom`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          const { type } = data[0];
          expect(type).to.equal('2 Bedroom');
          expect(status).to.equal('Success');
          expect(data).to.be.an('array');
          expect(data[0]).to.have.all.keys(
            'id',
            'status',
            'type',
            'state',
            'city',
            'address',
            'price',
            'created_on',
            'image_url',
            'ownerEmail',
            'ownerPhoneNumber',
            'purpose',
            'otherType'
          );
        })
        .end(done);
    });
  });
  // update property
  describe('UPDATE api/v1/property/:property-id', () => {
    it('should allow an authenticated user(Agent) to successfully update his/her property advert if he/she provides valid parameters', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}`)
        .field('price', 700000)
        .field('state', 'Ekiti')
        .field('city', 'Ado')
        .field('address', '40, Caleb Road')
        .field('type', 'Studio Flat')
        .attach(
          'image',
          path.resolve(__dirname, '../../../UI/assets/images/2.jpg')
        )
        .set('x-access-token', validToken)
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('Success');
          expect(data).to.have.all.keys(
            'id',
            'status',
            'type',
            'state',
            'city',
            'address',
            'price',
            'created_on',
            'image_url',
            'purpose',
            'imageName',
            'otherType'
          );
        })
        .end(done);
    });
    it('should prevent an unathenticated user from updating a property advert', done => {
      request
        .patch('/api/v1/property/2')
        .field('status', 'Available')
        .field('price', 80000.0)
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Required');
        })
        .end(done);
    });
    it('should prevent a user with an Invalid token from updating a property advert', done => {
      request
        .patch('/api/v1/property/2')
        .field('status', 'Available')
        .field('price', 80000.0)
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('x-access-token', inValidToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Invalid');
        })
        .end(done);
    });
    it('should prevent a user from updating a property advert if he/she provides invalid input parameters', done => {
      request
        .patch('/api/v1/property/2')
        .field('status', 'Available')
        .field('price', 'rhjfioo')
        .field('state', 'Lagos')
        .field('city', 12344)
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it('should prevent a user from updating a property advert with empty field parameters', done => {
      request
        .patch('/api/v1/property/2')
        .field('status', 'Available')
        .field('price', '')
        .field('state', 'Lagos')
        .field('city', '')
        .field('address', '')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it('should prevent any user except an Admin from updating a property advert posted by another user', done => {
      request
        .patch('/api/v1/property/1')
        .field('status', 'Available')
        .field('state', 'Lagos')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(403)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('403 Forbidden Request');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
    it("should return a 404 response code whenever a user attempts to update a property that doesn't exist", done => {
      request
        .patch('/api/v1/property/78787058689')
        .field('status', 'Available')
        .field('state', 'Lagos')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('404 Not Found');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
  });
  // mark property as sold/rent
  describe('PATCH api/v1/property/:property-id/sold', () => {
    it('should allow an authenticated user(Agent) to successfully mark his/her property as sold/rented', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}/sold`)
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('Success');
          expect(data).to.have.all.keys(
            'id',
            'status',
            'type',
            'state',
            'city',
            'address',
            'price',
            'created_on',
            'image_url',
            'purpose',
            'imageName',
            'otherType'
          );
        })
        .end(done);
    });
    it("should prevent a user who doesn't provide an access token from marking a property as sold/rented", done => {
      request
        .patch(`/api/v1/property/${testPropertyId}/sold`)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Required');
        })
        .end(done);
    });
    it('should prevent a user with an Invalid token from marking a property as sold/rented', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}/sold`)
        .set('x-access-token', inValidToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Invalid');
        })
        .end(done);
    });
    it('should prevent any user except an Admin from marking a property advert posted by another user as sold/rented', done => {
      request
        .patch(`/api/v1/property/1/sold`)
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(403)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('403 Forbidden Request');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
    it("should return a resource not found error response whenever a user attempts to mark a property that doesn't exist sold/rented", done => {
      request
        .patch('/api/v1/property/78787058689/sold')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('404 Not Found');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
  });
  describe('DELETE api/v1/property/:property-id', () => {
    it('should allow an authenticated user(Agent) to successfully delete his/her property advert', done => {
      request
        .delete(`/api/v1/property/${testPropertyId}`)
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          expect(status).to.equal('Success');
          expect(data).to.have.all.keys('message');
        })
        .end(done);
    });
    it("should prevent a user who doesn't provide an access token from deleting a property", done => {
      request
        .delete(`/api/v1/property/${testPropertyId}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Required');
        })
        .end(done);
    });
    it('should prevent a user with an Invalid token from deleting a property', done => {
      request
        .delete(`/api/v1/property/${testPropertyId}`)
        .set('x-access-token', inValidToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Invalid');
        })
        .end(done);
    });
    it('should prevent any user except an Admin from deleting a property advert posted by another user', done => {
      request
        .delete(`/api/v1/property/1`)
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(403)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('403 Forbidden Request');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
    it("should return a resource not found error response whenever a user attempts to delete a property that doesn't exist", done => {
      request
        .delete('/api/v1/property/78787058689')
        .set('x-access-token', validToken)
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('404 Not Found');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
  });
});
