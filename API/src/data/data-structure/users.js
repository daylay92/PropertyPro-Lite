import bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    email: 'zaylay92@yahoo.com',
    first_name: 'Ayo',
    last_name: 'Dele',
    password: bcrypt.hashSync('ayo1234', 8),
    phoneNumber: '08062490454',
    address: '23, Andy Street, Ketu',
    gender: 'Male',
    is_admin: false
  },
  {
    id: 2,
    email: 'yaylay92@yahoo.com',
    first_name: 'Ayo',
    last_name: 'Tomi',
    password: bcrypt.hashSync('tomi1234', 8),
    phoneNumber: '08062490454',
    address: '22, Andy Street, Ketu',
    gender: 'Female',
    is_admin: false
  }
];

export default users;
