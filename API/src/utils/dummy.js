import faker from 'faker';

//  valid user data
const validUserData = {
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  password: faker.internet.password(),
  confirm_password: faker.internet.password(),
  phone_number: '08063805512',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'Male'
};

//  incomplete user data
const incompleteUserData = {
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  password: '',
  confirm_password: '',
  phone_number: '',
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
  phone_number: 'hjiojojo',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'non'
};

//  already existing user data
const alreadyExistingUserData = {
  email: 'zaylay92@yahoo.com',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  password: faker.internet.password(),
  confirm_password: faker.internet.password(),
  phone_number: '08063805512',
  address: `${faker.address.streetAddress()}, Lagos, Nigeria`,
  gender: 'Male'
};

export {
  validUserData,
  incompleteUserData,
  invalidUserData,
  alreadyExistingUserData
};
