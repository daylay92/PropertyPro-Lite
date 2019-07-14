import faker from 'faker';
import UserServices from '../services/user';

// signup data
//  valid user data
const validUserData = {
  email: 'daylay863@gmail.com',
  first_name: 'King',
  last_name: 'Ayodele',
  password: 'rrft3456',
  confirm_password: 'rrft3456',
  phone_number: '08063805512',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`
};

//  incomplete user data
const incompleteUserData = {
  email: '',
  first_name: 'Eemiy',
  last_name: 'Kangodan',
  password: '',
  confirm_password: '',
  phone_number: '',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`
};

//  invalid user data
const invalidUserData = {
  email: 'cjlfkl',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  password: faker.internet.password(),
  confirm_password: faker.internet.password(),
  phone_number: 'hjiojojo',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`
};

//  already existing user data
const alreadyExistingUserData = {
  email: 'john.doe@gmail.com',
  first_name: 'Sam',
  last_name: 'Sung',
  password: 'King1234',
  confirm_password: 'King1234',
  phone_number: '08063805512',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`
};

// login credentials
// Valid credentials
const validLoginCredentials = {
  email: 'john.doe@gmail.com',
  password: 'johnny'
};
// Invalid credentials
const invalidLoginCredentials = {
  email: 'deskyahoo.com',
  password: 'ayo1234'
};
// Invalid credentials
const incompleteLoginCredentials = {
  email: 'zaylay92@yahoo.com',
  password: ''
};

// Property Test Data
// Valid Token
const validToken = UserServices.generateToken(2, false);
const inValidToken = 'eyJhbGciOiJI.UzI1NiIsInR5c.CI6IkpXVCJ9';
const validPropertyData = {
  status: 'Available',
  price: 800000.0,
  state: 'Lagos',
  city: 'Ikeja',
  address: '30, Caleb Road',
  type: '2 bedroom',
  image_url: '',
  purpose: 'For Rent'
};

export {
  validUserData,
  incompleteUserData,
  invalidUserData,
  alreadyExistingUserData,
  validLoginCredentials,
  invalidLoginCredentials,
  incompleteLoginCredentials,
  validToken,
  validPropertyData,
  inValidToken
};
