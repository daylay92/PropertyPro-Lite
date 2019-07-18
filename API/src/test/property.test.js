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
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/1.jpg'))
        .set('token', validToken)
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(res => {
          const { status, data } = res.body;
          testPropertyId = data.id;
          expect(status).to.equal('success');
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
            'other_type',
            'description'
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
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/1.jpg'))
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
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/1.jpg'))
        .set('Connection', 'keep-alive')
        .set('token', inValidToken)
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
        .field('type', 'others')
        .field('purpose', 'For Rent')
        .field('other_type', 're')
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/1.jpg'))
        .set('Connection', 'keep-alive')
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
          expect(res.body.errors).to.be.an('object');
        })
        .end(done);
    });
    it('should prevent a user from posting a property advert if he/she provides invalid input parameters such as selecting for sale and rented as purpose and status respectively', done => {
      request
        .post('/api/v1/property')
        .field('status', 'rented')
        .field('price', 'rhjfioo')
        .field('state', 'Lagos')
        .field('city', 12344)
        .field('address', '30, Caleb Road')
        .field('type', 'others')
        .field('purpose', 'for sale')
        .field('other_type', 'self-contain')
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/1.jpg'))
        .set('Connection', 'keep-alive')
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
          expect(res.body.errors).to.be.an('object');
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
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/1.jpg'))
        .set('Connection', 'keep-alive')
        .set('token', validToken)
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
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          expect(status).to.equal('success');
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
            'owner_email',
            'owner_phone_number',
            'purpose',
            'other_type',
            'description'
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
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          const { type } = data[0];
          expect(type).to.equal('mini flat');
          expect(status).to.equal('success');
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
            'owner_email',
            'owner_phone_number',
            'purpose',
            'other_type',
            'description'
          );
        })
        .end(done);
    });
    it('should return all property adverts whose type is of 2 Bedroom', done => {
      request
        .get(`/api/v1/property?type=2 Bedroom`)
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          const { type } = data[0];
          expect(type).to.equal('2 bedroom');
          expect(status).to.equal('success');
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
            'owner_email',
            'owner_phone_number',
            'purpose',
            'other_type',
            'description'
          );
        })
        .end(done);
    });
    it('should return a resource not found error response when a user filters for property adverts of a specific type that is currently not available on the App', done => {
      request
        .get(`/api/v1/property?type=FarmLand`)
        .set('token', validToken)
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
  // get single property
  describe('GET api/v1/property/:property-id', () => {
    it('should successfully return the property advert whose ID is specified', done => {
      request
        .get(`/api/v1/property/1`)
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          expect(status).to.equal('success');
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
            'owner_email',
            'owner_phone_number',
            'purpose',
            'other_type',
            'description'
          );
        })
        .end(done);
    });
    it("should return a resource not found error response if the property ID specified doesn't match the existing property adverts", done => {
      request
        .get(`/api/v1/property/675`)
        .set('token', validToken)
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
  // update property
  describe('PUT api/v1/property/:property-id', () => {
    it('should allow an authenticated user(Agent) to successfully update his/her property advert if he/she provides valid parameters', done => {
      request
        .put(`/api/v1/property/${testPropertyId}`)
        .field('price', 700000)
        .field('state', 'Ekiti')
        .field('city', 'Ado')
        .field('address', '40, Caleb Road')
        .field('type', 'others')
        .field('other_type', 'self-contain')
        .attach('image_url', path.resolve(__dirname, '../../../UI/assets/images/2.jpg'))
        .set('token', validToken)
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
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
            'other_type',
            'description',
            'updated_on'
          );
        })
        .end(done);
    });
    it('should prevent an unathenticated user from updating a property advert', done => {
      request
        .put('/api/v1/property/2')
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
        .put('/api/v1/property/2')
        .field('status', 'Available')
        .field('price', 80000.0)
        .field('state', 'Lagos')
        .field('city', 'Ikeja')
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('token', inValidToken)
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
        .put('/api/v1/property/2')
        .field('status', 'rented')
        .field('price', 'rhjfioo')
        .field('state', 'Lagos')
        .field('city', 12344)
        .field('address', '30, Caleb Road')
        .field('type', '2 bedroom')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('token', validToken)
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
        .put('/api/v1/property/2')
        .field('status', 'sold')
        .field('price', '')
        .field('state', 'Lagos')
        .field('city', '')
        .field('address', '')
        .field('type', 'others')
        .field('other_type', 'connecticut')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('token', validToken)
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
        .put('/api/v1/property/1')
        .field('status', 'Available')
        .field('state', 'Lagos')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('token', validToken)
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
        .put('/api/v1/property/787')
        .field('status', 'Available')
        .field('state', 'Lagos')
        .field('purpose', 'For Rent')
        .set('Connection', 'keep-alive')
        .set('token', validToken)
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
  // update property price
  describe('PATCH api/v1/property/:property-id', () => {
    it('should allow an authenticated user(Agent) to successfully update the price of  his/her property advert', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}`)
        .send({ price: 4000.0 })
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
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
            'other_type',
            'description',
            'updated_on'
          );
        })
        .end(done);
    });
    it("should prevent a user who doesn't provide an access token from updating the price of his/her property advert", done => {
      request
        .patch(`/api/v1/property/${testPropertyId}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Required');
        })
        .end(done);
    });
    it('should prevent a user with an Invalid token from updating the price of his/her property advert', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}`)
        .set('token', inValidToken)
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
          const { status, error } = res.body;
          expect(status).to.equal('401 Unauthorized');
          expect(error).to.equal('Access token is Invalid');
        })
        .end(done);
    });
    it('should prevent any user except an Admin from updating the price of a property advert posted by another user', done => {
      request
        .patch(`/api/v1/property/1`)
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(403)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('403 Forbidden Request');
          expect(res.body).to.have.all.keys('status', 'error');
        })
        .end(done);
    });
    it('should prevent a user from updating the price of a property advert with invalid input parameters', done => {
      request
        .patch('/api/v1/property/2')
        .send({ price: 'rhjfioo' })
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it('should respond with an error that tells the user he/she cannot send empty fields as a request to update the price of a property advert', done => {
      request
        .patch('/api/v1/property/2')
        .send({ price: '' })
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(res => {
          const { status } = res.body;
          expect(status).to.equal('400 Bad Request');
          expect(res.body).to.have.all.keys('status', 'error', 'errors');
        })
        .end(done);
    });
    it("should return a resource not found error response whenever a user attempts to update the price of a property that doesn't exist", done => {
      request
        .patch('/api/v1/property/787')
        .set('token', validToken)
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
    it('should allow an authenticated user(Agent) to successfully mark his/her property as sold if the  purpose of the property is for sale', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}/sold`)
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          expect(data.status).to.equal('rented');
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
            'other_type',
            'description',
            'updated_on'
          );
        })
        .end(done);
    });
    it('should allow an authenticated user(Agent) to successfully return the status of his/her property to available if he/she errorenous marks it as sold/rented', done => {
      request
        .patch(`/api/v1/property/${testPropertyId}/sold?available=true`)
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          expect(data.status).to.equal('available');
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
            'other_type',
            'description',
            'updated_on'
          );
        })
        .end(done);
    });
    it('should allow an authenticated user(Agent) to successfully mark his/her property has rented if the purpose of the property is for rent', done => {
      request
        .patch(`/api/v1/property/3/sold`)
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const { status, data } = res.body;
          expect(status).to.equal('success');
          expect(data.status).to.equal('sold');
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
            'other_type',
            'description',
            'updated_on'
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
        .set('token', inValidToken)
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
        .set('token', validToken)
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
        .patch('/api/v1/property/787/sold')
        .set('token', validToken)
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
        .set('token', validToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const {
            body: { status, data }
          } = res;
          expect(status).to.equal('success');
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
        .set('token', inValidToken)
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
        .set('token', validToken)
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
        .delete('/api/v1/property/787')
        .set('token', validToken)
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
