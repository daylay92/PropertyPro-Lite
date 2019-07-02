import faker from 'faker';

// signup data
//  valid user data
const validUserData = {
  email: faker.internet.email(),
  first_name: 'King',
  last_name: 'Ayodele',
  password: 'rrft3456',
  confirm_password: 'rrft3456',
  phoneNumber: '08063805512',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'Male'
};

//  incomplete user data
const incompleteUserData = {
  email: '',
  first_name: 'Eemiy',
  last_name: 'Kangodan',
  password: '',
  confirm_password: '',
  phoneNumber: '',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'Male'
};

//  invalid user data
const invalidUserData = {
  email: 'cjlfkl',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  password: faker.internet.password(),
  confirm_password: faker.internet.password(),
  phoneNumber: 'hjiojojo',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'non'
};

//  already existing user data
const alreadyExistingUserData = {
  email: 'zaylay92@yahoo.com',
  first_name: 'Sam',
  last_name: 'Sung',
  password: 'King1234',
  confirm_password: 'King1234',
  phoneNumber: '08063805512',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'Male'
};

// login credentials
// Valid credentials
const validLoginCredentials = {
  email: 'zaylay92@yahoo.com',
  password: 'ayo1234'
};
// Invalid credentials
const invalidLoginCredentials = {
  email: 'desk@yahoo.com',
  password: 'ayo1234'
};
// Invalid credentials
const incompleteLoginCredentials = {
  email: 'zaylay92@yahoo.com',
  password: ''
};

export {
  validUserData,
  incompleteUserData,
  invalidUserData,
  alreadyExistingUserData,
  validLoginCredentials,
  invalidLoginCredentials,
  incompleteLoginCredentials
};
